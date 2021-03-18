/**
 * 전략 패턴 객체는 정해진 헹동을 계속 일으키는 인스턴스 or 함수
 * 커맨드 패턴은 특정 호출 상태를 박제해서 몇번이고 반복할 수 있는 패턴
 * 어떤 문(statement)가 실행되는 행위 자체를 식으로 변환해 버리는 것 - 커맨드를 저장해 버리는 패턴이 커맨드 패턴이다.
 * 따라서 전략 패턴을 커맨드 패턴으로 바꾸어 주려면 단지 인지만 기억해두어도 충분하다. 전략 객체를 커맨드 객체화 하는 것.
 * 커맨드 패턴은 다음번에 똑같은 실행문을 저장해 둔 커맨드 객체와, 객체를 실행하는 실행기(invoker)로 나뉜다.
 */
const Github = class {                                          // 정의 시점 - 변하지 않는 부분
  constructor(id, repo) {
      this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
  }
  load(path) {                                                // 공통 부분 - Template Method
      const id = 'callback' + Github._id++;
      const f = Github[id] = ({data:{content}}) => {
          delete Github[id];
          document.head.removeChild(s);
          this._parser[0](content, ...this._parser[1]);                     // 커맨드 인보커
      };
      const s = document.createElement('script');
      s.src = `${this._base + path}?callback=Github.${id}`;
      document.head.appendChild(s);
  }
  setParser(f, ...arg){this._parser = [f, arg];}                            // 커맨드 객체화
};
Github._id = 0;

const el = v => document.querySelector(v);
const parseMD = v => {};
const loader = new Github('hikaMaeng', 'codespitz79');


/**
 * 분기에 따라서 커맨드 객체를 선택하는 문제가 남아있다.
 * if에 따른 선택을 어떻게 하면 피하거나 최소화할 수 있을까? 가 그 다음의 관심사.
 * 모든 연산의 결과를 미리 알고 있다면, 값 테이블로 바꿀 수 있다. -> 이런 사용을 라우터 라고 부른다.
 * 라우터는 필연적으로 라우터 테이블을 가지고 다닌다. 라우터 테이블은 선택이나 연산을 제거하고, 
 * 경우의 수를 넣어서 대응하는 결과물을 반환하도록 한다.(matching 기)
 */

// 명칭은 Loader 지만, 실제 역할은 Router이다. 
const Loader = class {
    constructor(id, repo) {
        this._git = new Github(id, repo);
        this._router = new Map;                 // 라우팅 테이블
    }
    add(ext, f, ...arg){ // 확장자 별로 테이블을 구성하겠다. 
        ext.split(',').forEach(v => this._router.set(v, [f, ...arg]));
    }
    load(v) {
        const ext = this._v.split('.').pop();   // 라우팅 테이블은 key 값을 잘 정해주어야 한다. 꼭 고정된 값이 아닐 수도 있다.
                                                // 정규 표현식이나, 함수일 수도 있는데, 결과적으로 값을 뱉어내는 무언가를 정해주어야 된다. 
                                                // 심지어 애초에 map에 저장하는 key자체도 함수일 수 있다. 해당 함수 호출 결과를 만족하면 해당 값으로 저장하겠다고 할 수도 있다.
                                                // java에서 stream을 사용해서 값의 일부만 가지고 연산을 해서 사용하는 방식 -> 왜 이렇게 사용할까? 이렇게 사용하는 이점은?
                                                // 메모리를 연산으로 바꾼 것이다. 결과적으로 메모리를 덜 사용할 수 있다. 
        if(!this._router.has(ext)) return;
        this._git.setParser(...this._router.get(ext));      // 확장자 경우에 따라 자동 분기
        this._git.load(v);
    }
}

// setParser에 인자까지 같이 넘어간다.
const img = (v, el) => el.src = 'data:text/plain;base64,' + v;
// loader.setParser(img, el('#b'));
// loader.load('xx.png');

const md = (v, el) => el.innerHTML = parseMD(v);        
// loader.setParser(md, el('b'))
// loader.load('xx.md');

const loader = new Loader('hikaMaeng', 'codespitz79');
loader.add('jpg,png,gif', img, el('#a'));                   // 발생가능한 경우의 수를 값으로 기술
loader.add('md', md, el('#b'));                             // Loader의 코드가 변경되지 않음

loader.load('xx.jpg');
loader.load('xx.md');

/**
 * 디자인 패턴의 2번째 원리는 문을 제거해서 값으로 변환시키는 객체화 이다.
 * 문(statement)으로 구성된 코드는 변경시 코드자체를 변경해야 하기 때문에 크리티컬 하다.
 * 코드를 변경하지 않고, 값으로 바꿔서 추가만 하면 코드를 변경하지 않아도 된다.
 * 코드가 격리구간이 생겨서 격리 구간과 아닌 구간으로 나눠서 짤 수 있게 되었다.
 * 어떻게 하면 산업 현장에서의 생산성을 끌어올릴 것인가?
 * 결론: 격리 구간 이외의 부분에 대한 개발은 병렬적으로 이루어질 수 있다.
 * 
 * 소유 위임을 통해서, 코드의 분산을 정적으로 정의하지 않고 경우의 수에 따라서 동적으로 정의할 수 있게 했다.
 * 동시에 if 문에 대한 분기는 문을 값으로 변경하는 것으로 대체한다. 
 * if문을 제거하기 위한 패턴: 템플릿 메소드 패턴, 전략 패턴, 상태 패턴
 * +) for문을 제거하기 위한 패턴: 이터레이터 패턴, 컴포지트 패턴, 비지터 패턴
 * +) for문 중간에 if문 을 사용하고 싶다면: 데코레이터 패턴, 체인 오브 리스펀스빌리티 페턴
 * 
 * TDD는 디자인 패턴과 밀접한 관계가 있다.
 * 핵심은 좋은 코드는 테스트 코드를 짜도 괜찮지만
 * 나쁜 코드는 테스트 코드를 짜도 소용이 없다.
 * 나쁜 코드는 100개의 테스트를 통과한다고 하더라도 프로그램의 안정성을 보장해 주지 못한다.
 * 101번 째의 테스트에서 얼마든지 오류가 발생할 수 있다.
 * 그러나 잘 격리된 코드의 경우 격리된 구간에 대해서는 테스트가 보장을 해주기 때문에
 * 새로 추가된 코드에 대해서만 테스트를 작성하면 된다.
 * 따라서 코드의 내구성(안정성)은 격리의 수준에 따라서 결정된다. -> 얼마나 견고한지.
 */