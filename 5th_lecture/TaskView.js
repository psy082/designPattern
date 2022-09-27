// TaskView라고 썼지만 Decorator다.
export const TaskView = class {
  set(tv) {
    this._tv = tv;
    return this;
  }
  // 모든 taskView는 앞의 객체에 협조를 받아서 처리가 되고
  // 자기가 할 일만 책임지기 때문에 그 형식이 동일하다 -> template method pattern이 사용되었다.
  task(parent, task) {
    this.result = this._tv ? this._tv.task(parent, task) : task._title; // 앞의 애가 한 것을 수거하는 과정이다.
    return this._task(parent, task);
  }
  _task(parent, task) {
    throw "override";
  }
};
// 일반적으로 데코레이터는 진입점 데코레이터가 존재한다.-> terminal이라고 부르는 애들이 있다.
// 종단점 객체
TaskView.base = new (class extends TaskView {
  _task(parent, task) {
    return this.result;
  }
})();
// 이 데코레이터 객체에 맞춰서 visitor를 수정해야 한다 -> 데코레이터를 소유해서 위임을 한다.

export const Priority = class extends TaskView {
  _task(parent, task) {
    return this.result.replace(
      /\[(urgent|high|normal|low)\]/gi,
      '<span class="$1">$1</span>'
    );
  }
};

export const Member = class extends TaskView {
  constructor(...members) {
    super();
    this._reg = new RegExp(`@(${members.join("|")})`, "g");
  }
  _task(parent, task) {
    return this.result.replace(this._reg, '<a href="member/$1">$1</a>');
  }
};
