export const Renderer = class {
  render({ task, list }) {
    const v = this._folder(task);
    this.subTask(this._parent(v, task), list);
  }
  subTask(parent, list) {
    list.forEach(({ task, list }) => {
      const v = this._task(parent, task);
      this.subTask(this._parent(v, this), list);
    });
  }
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
// template method pattern은 hook 간에 context를 공유하는 방법이 다양하기 때문에 어렵다.
// 상황에 맞는 context 공유 방법을 선택해야 한다.
