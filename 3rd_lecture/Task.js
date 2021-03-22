const Task = class {
    constructor(title, date = null) {
        if(!title) throw 'Invalid Title';
        this._title = title;
        this._date = date;
        this._isComplete = false;
    }
    // method를 어떻게 노출하는기? => 캡슐화를 적용한 것
    // toggle 함수가 toggle을 제공하지만 진짜로 toggle을 할지 말지는 toggle이 결정한다.
    // 예를 들어서 toggle이 end date가 지난 이후에는 toggle을 못하게 할 수도 있다.
    isComplete(){return this._isComplete;}
    // 중요한 건 외부에는 toggle만 노출한다는 사실이다.
    // method가 외부에 노출될 때, 가장 신경써야 하는 것은 "캡슐화가 잘 되었는가?"
    // 필요한 기능만 외부로 노출하는 캡슐화를 잘 할 수록 내부의 변경에 더 자유롭다.
    toggle(){this._isComplete = !this._isComplete}
    // _title, _date는 외부에서 모르고 알 필요도 없다.
    // 따라서 이런 사소한 method 조작 조차도 위임을 통해서 책임이 누구있는지를 명확하게 하지 않으면
    // 외부에서 의존성 있는 코드들을 일일이 찾아다녀야 한다.
    // 캡슐화 되어있는 method만 외부에 공개하고 상대방은 나의 캡슐화된 method만 알고 있기 때문에
    // 내부에서 변경할 수 있는 공간이 더 생긴다.
    sortTitle(task) {
        return this._title > task._title;
    }
    sortDate(task) {
        return this._date > task._date;
    }
}

// 정렬을 제공해야 되는데, 외부에서 sort를 시키는데, 내부에서 sort에 반응해야 한다.
// 외부의 sorting 요청과, 내부의 실제 sorting 구현은 관심사도 다르고 권한도 다르다.
// 따라서 taskSort에서 Title을 어떻게 sorting하는 지는 외부에서는 알 수가 없고 
// 내부에 위임할 수밖에 없다.
// 헬퍼 객체, 아무런 역할도 안하고, title과 date라는 task의 일부지식(sortTitle, sortDate)을 
// 가지고 있는 도우미 클래스 그러나 이 객체는 제대로된 객체가 아니다.
// taskSort는 task에 대한 지식을 어떻게 가지고 있을까? => task 객체 전체에 대해서 의존성을 가지고 만들어 졌다.
// Task 전체에 대한 지식을 기반으로 만들어 졌기 때문에 Task 객체의 변화에 취약하다.
// 따라서 수정을 용이하게 하기 위해서 행동과 권한을 제약할 필요가 있다. 
const taskSort = {
    title: (a, b) => a.sortTitle(b),
    date: (a, b) => a.sortDate(b)
}

// => 제약되어 있는 클래스 체계로 변경