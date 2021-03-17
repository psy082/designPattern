/**
 * 전략 패턴 객체는 정해진 헹동을 계속 일으키는 인스턴스 or 함수
 * 커맨드 패턴은 특정 호출 상태를 박제해서 몇번이고 반복할 수 있는 패턴
 * 따라서 전략 패턴을 커맨드 패턴으로 바꾸어 주려면 단지 인지만 기억해두어도 충분하다.
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
          this._parser[0](content, ...this._parser[1]);                             // 위임 부분 - if case 별로 달라져야 하는 부분
      };
      const s = document.createElement('script');
      s.src = `${this._base + path}?callback=Github.${id}`;
      document.head.appendChild(s);
  }
  setParser(f, ...arg){this._parser = [f, arg];}                            // 위임 객체 -> strategy pattern
};
Github._id = 0;