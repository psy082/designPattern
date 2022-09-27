const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, v) => {
    typeof el[v[0]] == "function" ? el[v[0]](v[1]) : (el[v[0]] = v[1]);
    return el;
  }, document.createElement(tag));

export const DomRenderer = class {
  constructor(parent) {
    this._parent = parent;
  }
  // 상속 받은 class가 없지만
  // 여러가지 지식들이 들어있다.
  // task list가 어떻게 생겼는지 알고 있는 도메인 지식이 들어가 있다.
  render(data) {
    const {
      task: { _title: title },
      list,
    } = data; // 1. 받아온 list 구조를 해석할 수 있다. 2. render 수준에서 그림을 처음 그릴 때 쓰는 로직이 folder를 그리는 로직을 가지고 있다.
    const parent = document.querySelector(this._parent);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: title }));
    // sub rendering에 대한 반복구조인 컴포지트 패턴에 대한 지식도 내장하고 있다.
    parent.appendChild(this._render(el("ul"), list));
  }
  _render(parent, list) {
    list.forEach(({ task, list }) => {
      const li = parent.appendChild(el("li"));
      li.appendChild(el("div", { innerHTML: task._title }));
      li.appendChild(this._render(el("ul"), list));
    });
    return parent;
  }
};
