const Github = class {                                          // 정의 시점 - 변하지 않는 부분
  constructor(id, repo) {
      this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
  }
  load(path) {                                                // 공통 부분 - Template Method
      const id = 'callback' + Github._id++;
      const f = Github[id] = ({data:{content}}) => {
          delete Github[id];
          document.head.removeChild(s);
          this._parser(content);                              // 위임 부분 - if case 별로 달라져야 하는 부분
      };
      const s = document.createElement('script');
      s.src = `${this._base + path}?callback=Github.${id}`;
      document.head.appendChild(s);
  }
  set parser(v){this._parser = v;}                            // 위임 객체 -> strategy pattern
};
Github._id = 0;
// 따라서 template method pattern과 strategy pattern은 형제다. 두 패턴은 상호 변환이 가능하다.
// 상속으로 구현 -> template method pattern
// 위임으로 구현 -> strategy pattern
// 더 이상 정의 시점의 class가(상속 받는 class)가 존재하지 않는다.

const el = v => document.querySelector(v);
const parseMD = v => {};
const loader = new Github('hikaMaeng', 'codespitz79');

// img
const img = v => el('#a').src = 'data:text/plain;base64,' + v;
loader.parser = img;
loader.load('xx.png');

/* md
 * 새로운 객체를 만들지 않고 parser만 바꿔서 바로 load 할 수 있다. 
 * template method pattern과 strategy pattern의 가장 큰 차이점
 * template method pattern은 사용을 위해서 거기에 맞는 객체 생성이 필요하지만
 * strategy pattern에서는 loader를 한번만 만들고 parser만 갈아 끼우면 된다.
 * 전략 패턴을 사용하면 팀 내에서 해당 객체를 잘 추적하지 못하면 무조건 버그가 발생한다.
*/
const md = v => el('#b').innerHTML = parseMD(v);        
loader.parser = md;
loader.load('xx.md');