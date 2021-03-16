// 1.대체 가능성               -- 하위 형은 상위 형을 대신할 수 있다.
// 2.내적 일관성, 내적 동질성   -- 내적 동질성은 아무리 확장되기 전의 메소드나 계층 상에 있는 메소드를 호출해도 나의 동질성은 변하지 않는다.
// 태생을 계속 유지하려고 하는 성질 -> template method가 가능한 이유.
const Parent = class {
    wrap(){
        this.action();
    }

    action(){
        console.log("Parent");
    };
};

const Child = class extends Parent {
    action(){
        console.log("Child");
    };
};
const a = new Child();
console.log(a instanceof Parent);       // Child는 Parent를 대신할 수 있다.
a.wrap();

