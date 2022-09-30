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

export const Remove = class extends TaskView {
  // 권한을 위반하고 있기 때문에 잠재적으로 버그가 확정되어 있다.
  // 무조건 망가진다.
  // 권한을 축소하려면 어떻게 해야 하는가?
  constructor(render) {
    super();
    this._render = render;
  }
  _task(parent, task) {
    const id = Remove.id++;
    Remove[id] = (_) => {
      delete Remove[id];
      parent.remove(task);
      // this._render(); // 권한이 넘어가는 일을 준 것이다.
      // 물어보지 말고 그냥 말을 해(할리우드 원칙 -> 옵저버 패턴)
      // subject가 권한이 적은 애여야 한다.
      // 권한이 많은 애가 observer여야 한다.
    };
    return this.result + `<a onclick="Remove[${id}]()`;
  }
};
Remove.id = 0;
