export const Renderer = class {
  constructor(processor) {
    this.p = processor;
  }
  render({ task, list }) {
    this.p.folder(task);
    this.p.parent(task);
    this.subTask(list);
  }
  // visitor를 사용하는 쪽의 협조를 얻어야지만 visitor가 제대로 동작할 수 있다.
  // visitor의 method를 호출한 후에 그 결과 값을 다음 visitor의 method에 넣어주는 책임을
  // visitor 사용하는 쪽이 협조하지 않으면 동작이 깨지게 된다. -> visitor가 완전하게 자기의 책임을 가지고 있다고 하기 어렵다.
  subTask(list) {
    list.forEach(({ task, list }) => {
      this.p.task(task);
      if (list.length) {
        this.p.parent(task);
        this.subTask(list);
      }
    });
  }
  set processor(processor) {
    this.p = processor;
  }
};

const el = (tag, attr = {}) =>
  Object.entries(attr).reduce((el, [key, value]) => {
    typeof el[key] === "function" ? el[key](value) : (el[key] = value);
    return el;
  }, document.createElement(tag));

Renderer.Processor = class {
  constructor() {
    this.prop = Object.create(null);
  }
  folder(task) {
    throw "override";
  }
  parent(v, task) {
    throw "override";
  }
  task(v, task) {
    throw "override";
  }
};

// 데코레이터를 적용하기 적합한 부분은 어디일까?
// 가장 수정이 자주 일어날 것 같은 부분
// 런타임에 기능을 추가할 수 있다는 의미는, 지금 기능이 없더라도 나중에 마음대로 기능을 추가할 수 있다는 뜻
export const Dom = class extends Renderer.Processor {
  constructor(parent) {
    super();
    this._p = parent;
  }
  folder(task) {
    const parent = document.querySelector(this._p);
    parent.innerHTML = "";
    parent.appendChild(el("h1", { innerHTML: task._title }));
    this.prop.parent = parent;
  }
  parent(task) {
    const ul = el("ul");
    this.prop.parent.appendChild(ul);
    this.prop.parent = ul;
  }
  task(task) {
    const li = el("li");
    li.appendChild(el("div", { innerHTML: task._title }));
    this.prop.parent.appendChild(li);
    this.prop.parent = li;
  }
};

export const ConsoleProcessor = class extends Renderer.Processor {
  folder(task) {
    console.log("----------------------");
    console.log("folder:", task._title);
    this.prop.parent = "";
  }
  parent(task) {}
  task(task) {
    console.log(this.prop.parent, task._title);
    this.prop.parent += "-";
  }
};
