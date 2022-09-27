const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, v) => {
    typeof el[v[0]] == "function" ? el[v[0]](v[1]) : (el[v[0]] = v[1]);
    return el;
  }, document.createElement(tag));

export const DomRenderer = class {
  constructor(parent) {
    this._parent = parent;
  }
  render(data) {
    const {
      task: { _title: title },
      list,
    } = data;
    const parent = document.querySelector(this._parent);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: title }));
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
