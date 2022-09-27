import { Visitor } from "./Visitor";

const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, v) => {
    typeof el[v[0]] == "function" ? el[v[0]](v[1]) : (el[v[0]] = v[1]);
    return el;
  }, document.createElement(tag));

const DomVisitor = class extends Visitor {
  constructor(parent) {
    super();
    this._p = parent;
  }
  folder({ _title: title }) {
    const parent = document.querySelector(this._p);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: title }));
    return parent;
  }
  parent(v, _) {
    return v.appendChild(el("ul"));
  }
  task(v, { _title: title }) {
    const li = el("li");
    li.appendChild(el("div", { innerHTML: title }));
    return li;
  }
};
