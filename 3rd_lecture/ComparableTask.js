const Sort = class {
    // a가 a.sortTitle이나 a.sortDate를 호출할 수 있는 이유는,
    // 본인에게 정의되어 있는 추상 클래스의 메소드이기 때문에 
    // sortTitle과 sortDate 메소드에 대한 지식이 자기 자신에게 있다. 
    // 자기 책임에 적합한 자기 지식을 가지게 되었다. 
    // 따라서 이제 Sort는 Task에 대한 지식이 전혀 없어도 된다.
    // 대신 필요할 때 부른다. 언제 필요한가? 구현된 sortTitle, sortDate를 실행할 때.
    // 남의 참조가 없고, 본인 참조만 존재하게 되었다. 본인의 권한 내에서 행사하고 있다.
    static title(a, b) { a.sortTitle(b); }
    static date(a, b) { a.sortDate(b); }
    sortTitle(task) { throw 'override'; }
    sortDate(task) { throw 'override'; }
}


// 반대로 Task가 Sort를 이어받아서 구상 코드를 작성할 책임을 가지게 되었다.
// 거꾸로 Task는 Sort라는 인터페이스에 두 메소드를 맞춰주고 있다.
const Task = class extends Sort {
    // factory 함수가 더 추가되었다.
    // 그래서 new Task를 못하게 하려고 한다.
    // 근데 왜 factory 함수를 제공하는 것일까?
    // entity 관계에서 보면 TaskList에 add로 문자열을 넘겨서 task를 생성했다. 
    // 그렇다면 TaskList가 Task를 생성하는 방법을 알고 있다는 뜻이다.
    // 근데 new Task의 나쁜 점은 뭘까? constructor도 외부에 공개되어 있는 public method이다. 
    // 근데 생성할 때, 어쩔 수 없이 써야 되서 감추고 싶다고 감춰지는 method가 아니다. 외부에 반드시 공개가 된다.
    // 그런데 외부에 생성자를 공개하고 싶지 않다면 생성자 대신에 factory 함수를 제공할 수 있다.
    // 생성에 대한 지식이 외부에 노출되지 않게 할 수 있다.
    // 생성자가 외부에 노출되면, 생성자도 바꾸고 싶은 경우에는 변경을 하기가 어렵다.
    // 그래서 이전에는 생성자가 직접 외부와 맞닿은 인터페이스이기 때문에 기본 값 정책이 생성자에 붙었지만
    // factory 메소드가 생기면서 기본 값이 factory 메소드에 붙는다.
    static get(title, date = null) { return new Task(title, date); }

    constructor(title, date) {
        if(!title) throw 'Invalid title';
        this._title = title;
        this._date = date;
        this._isComplete = false;
    }
    isComplete(){ return this._isComplete; }
    toggle(){ this._isComplete = !this._isComplete; }
    sortTitle(task){ return this._title > task._title; }
    sortDate(task){ return this._date > task._date; }
}
