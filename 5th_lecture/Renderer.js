export const Renderer = class {
  constructor(visitor) {
    this._visitor = visitor;
  }
  render({ task, list }) {
    const v = this._visitor._folder(task);
    this.subTask(this._visitor._parent(v, task), list);
  }
  // visitor를 사용하는 쪽의 협조를 얻어야지만 visitor가 제대로 동작할 수 있다.
  // visitor의 method를 호출한 후에 그 결과 값을 다음 visitor의 method에 넣어주는 책임을
  // visitor 사용하는 쪽이 협조하지 않으면 동작이 깨지게 된다. -> visitor가 완전하게 자기의 책임을 가지고 있다고 하기 어렵다.
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
