export const Renderer = class {
  constructor(visitor) {
    this._visitor = visitor;
  }
  render({ task, list }) {
    const v = this._visitor._folder(task);
    this.subTask(this._visitor._parent(v, task), list);
  }
  subTask(parent, list) {
    list.forEach(({ task, list }) => {
      const v = this._visitor._task(parent, task);
      this.subTask(this._visitor._parent(v, this), list);
    });
  }
  set visitor(_visitor) {
    this._visitor = _visitor;
  }
};
