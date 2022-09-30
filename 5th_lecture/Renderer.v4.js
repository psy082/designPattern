import { TaskView } from "./TaskView.js";

export const Renderer = class {
  constructor(processor) {
    this.p = processor;
  }
  render({ task, list }) {
    this.p.folder(task);
    this.p.parent(task);
    this.subTask(list);
  }

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
    this._tv = TaskView.base; // 제일 먼저 visitor 가 생성되는 시점에 종단점 데코레이터를 만들었다.
  }
  taskView(...tv) {
    tv.forEach((tv) => (this._tv = tv.set(this._tv)));
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
  // 부모가 제공해주는 sevice인 taskRender를 받아서
  // 미리 설정된 decorator의 혜택을 받을 수 있다.
  taskRender(task) {
    // 너는 나한테 묻지말고 taskRender만 호출해
    return this._tv.task(this.prop.ptask, task);
  }
};

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
    this.prop.ptask = task;
  }
  task(task) {
    const li = el("li", { innerHTML: this.taskRender(task) });
    // 그런데 li 객체 생성에 있어서
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
