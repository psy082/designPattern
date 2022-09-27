export const Visitor = class {
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

// Visitor 패턴은 기본적으로 전략 패턴이다. 전략 패턴이 아닌 비지터 패턴은 없다.
// 더 이상 Render와 상호작용하는 건 불가능하다.

// 그러면 이걸 왜 visitor라고 부르는가?
// 디자인 패턴들의 UML은 모두 4개의 객체가 등장하고 ㄷ 로 관계가 형성되어 있다. => 구분이 안된다.
// 완전한 전략 객체인데 왜 Visitor라고 부르는가?
// 전략 객체지만 순회하는 recursive 안에서 역할을 수행하기 때문에 이 전략객체를 visitor 라고 부르는 것이다.
// 복잡한 recursive for 구문 내에서 직접 처리 하지 않고 완벽히 밖으로 위임하는 데 성공했는데 이런 전략 객체를 visitor라고 부른다.

// 단순히 loop가 아니라 복잡한 data를 순회하는 사이에 외부에 작업을 위임할 수 있다면 이런 패턴을 비지터 패턴이라고 한다.
