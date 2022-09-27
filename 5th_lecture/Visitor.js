const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, [key, value]) => {
    typeof el[key] === "function" ? el[key](value) : (el[key] = value);
    return el;
  }, document.createElement(tag));

const Visitor = class {
  _folder(task) {
    throw "override";
  }
  _parent(v, task) {
    throw "override";
  }
  _task(v, task) {
    throw "override";
  }
};

export const DomVisitor = class extends Visitor {
  constructor(parent) {
    super();
    this._p = parent;
  }
  _folder(task) {
    const parent = document.querySelector(this._p);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: task._title }));
    return parent;
  }
  _parent(v, _) {
    return v.appendChild(el("ul"));
  }
  _task(v, task) {
    const li = v.appendChild(el("li"));
    li.appendChild(el("div", { innerHTML: task._title }));
    return li;
  }
};

export const ConsoleVisitor = class extends Visitor {
  _folder(task) {
    console.log("----------------------");
    console.log("folder:", task._title);
    return "";
  }
  _parent(v) {
    return v;
  }
  _task(v, task) {
    console.log(v, task._title);
    return v + "-";
  }
};
