import { Renderer } from "./Renderer.js";

const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, v) => {
    typeof el[v[0]] == "function" ? el[v[0]](v[1]) : (el[v[0]] = v[1]);
    return el;
  }, document.createElement(tag));

export const DomRenderer = class extends Renderer {
  constructor(parent) {
    super();
    this._p = parent;
  }

  _folder({ _title: title }) {
    const parent = document.querySelector(this._p);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: title }));
    return parent;
  }

  _parent(v, _) {
    return v.appendChild(el("ul"));
  }

  _task(v, { _title: title }) {
    const li = v.appendChild(el("li"));
    li.appendChild(el("div", { innerHTML: title }));
    return li;
  }
};
// DomReneder, ConsoleRenderer 모두
// 내부에서 은닉, 캡슐화를 하기 위해 this context를 사용하지 않는다.
// 따라서 이 객체들은 객체 지향이 아니다.
// 내부에서 하는 모든 일들을 다 유틸리티 함수로 외부로 빼내도 상관이 없다.
// 만들고 나서도 역할 검증을, 코드와 역할에 맞춰서 재 검증 해야 한다.
