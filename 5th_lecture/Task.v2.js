// 역할 모델의 재밌는 점은
// 역할이 분리되어 있을 때는
// 책임 권한 때문에 수 많은 일이 일어나는데,
// 뿐만 아니라 역할 병합 때에도 수 많은 일이 일어난다.
export const Task = class {
  // 이 factory 함수는 누구를 위한 함수인가?
  // 원래는 외부에 추상화 계층을 노출하기 위한 인터페이스로 필요한 것
  // 지금은 Task가 Task를 생성하기 때문에 필요가 없어졌다.
  // static get(title, date = null) {
  //   return new Task(title, date);
  // }
  constructor(title, date) {
    this._title = title;
    this._date = date;
    this._isComplete = false;
    this._list = []; // Task도 sub list를 가질 수 있다는 점이 새로 추가된 변경 사항
  }
  isComplete() {
    return this._isComplete;
  }
  toggle() {
    this._isComplete = !this._isComplete;
  }
  // factory 함수의 기본 값 정책이었 던 것도 add로 옮겨 온다.
  // 앞으로 외부에서는 자식을 추가하는 함수로 add를 (entry로) 제공할 것이기 때문에
  // 외부에서는 add 함수 외에는 자식에게 task를 추가할 방법이 없다.
  add(title, date = null) {
    this._list.push(new Task(title, date));
  }
  remove(task) {
    const list = this._list;
    if (list.includes(task)) {
      list.splice(list.indexOf(task), 1);
    }
  }
  byTitle(stateGroup = true) {
    return this.list("title", stateGroup);
  }
  byDate(stateGroup = true) {
    return this.list("date", stateGroup);
  }
  // 계층 구조의 task 전체에 대해서 정렬된 list를 얻고 싶다.
  // 기존의 방식으로는 task의 한단계 하위의 task list만 얻을 수 있다.
  // 그렇다면 아래의 코드에서 컴포지트 패턴의 인터페이스가 되는 부분은 어디인가?
  // 잘 모르겠고 list를 내게 다오 라는 마법의 문장이다.
  // 나에서 부터 나의 자식까지 모두 list만 구현하면 된다.
  // 그 list 함수가 보장해 주는 것은 list 함수 호출의 결과로 task와 list가 있는 객체가 반환되는 것만 보장되면 된다.
  // 어떤 자식은 task list에 배열을 만들어줄 수도 있고 task에만 값이 있고 list에는 아무것도 반환하지 않을 수도 있다.
  // 중요한 건 list 인터페이스만 맞으면 자식의 세부 구현이 어떻게 되었든지 간에 연쇄 반응을 일으킨다.
  // 이 것이 composite pattern의 핵심이다.
  // recursive를 도는 약속을 하나만 정하고 나머지는 다 자식에게 맡긴다.
  list(sort, stateGroup = true) {
    const list = this._list;
    const f = (a, b) => a[`_${sort}`] > b[`_${sort}`];
    const map = (task) => task.list(sort, stateGroup);
    return {
      task: this,
      list: !stateGroup
        ? [...list].sort(f).map(map)
        : [
            ...list
              .filter((v) => !v.isComplete())
              .sort(f)
              .map(map),
            ...list
              .filter((v) => v.isComplete())
              .sort(f)
              .map(map),
          ],
    };
  }
};

// 어찌되었든 최초의 Root에서는 Task를 생성해 주어야 한다.
// 진입점이 있다.
// 해당 진입점은 일반적으로 예외 처리가 필요하고, 진입점이 없어지는 로직이 따로 필요하다.
// 자기 참조 무결성이라고도 한다.

class Search {
  search(v) {}
}

// composite에 해당하는 부분은 search 메소드
class File extends Search {
  search(v) {
    return this.contents.includes(v) ? [this] : [];
  }
}

class Folder extends Search {
  search(v) {
    return this.children.filter((f) => f.search(v).length);
  }
}
