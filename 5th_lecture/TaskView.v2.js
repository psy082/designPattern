const TaskView = class {
  addObserver(v) {
    this.observer = v;
  }
  notify(msg) {
    this.observer && this.observer.observe(msg);
  }
  set(tv) {
    this._tv = tv;
    return this;
  }
  task(parent, task) {
    this.result = this._prev ? this._tv.task(parent, task) : task._title;
    return this._task(parent, task);
  }
  _task(parent, task) {
    throw "override";
  }
};
// 권한을 줄여야 하기 떄문에 subject로 넣는 다는 센스가 중요하다.
// 권한을 이양하기 위한 장치이다.
const Remove = class extends TaskView {
  _task(parent, task) {
    const id = (Remove[id] = (_) => {
      delete Remove[id];
      parent.remove(task);
      this.notify("rerender");
    });
    return this.result + `<a onclick="Remove[${id}]()>X</a>`;
  }
};
Remove.id = 0;
