export const Renderer = class {
  constructor(visitor) {
    this.visitor = visitor;
  }
  render({ task, list }) {
    const v = this.visitor.folder(task);
    this.subTask(this.visitor.parent(v, task), list);
  }
  subTask(parent, list) {
    list.forEach(({ task, list }) => {
      const v = this.visitor.task(parent, task);
      this.subTask(this.visitor.parent(v, this), list);
    });
  }
};

// this context에 의존 하지 않는 완전한 utility라면
// 완전한 has-a 관계로 변경되어야 한다. --> 소유 관계로 변경된다.
// 이제 템플릿 메소드 패턴/전략 패턴을 사용할 시점을 구분할 수 있게 되었다.
// 부모의 컨텍스트에 과하게 의존하고 있다면 은닉, 캡슐화를 위해서 템플릿 메소드 패턴을 사용하는 것이 좋다.
// 만약에 부모의 컨텍스트를 사용하고 있지 않다면 전략 패턴을 사용해야 한다.
// 전략 객체가 자기를 소유한 객체의 지식이 많이 없다면 적절하지만 너무 많은 정보를 뺴내온다면 템플릿 메소드 패턴의 후보이다.
