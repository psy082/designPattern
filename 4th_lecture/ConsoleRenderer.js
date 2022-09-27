export const ConsoleRenderer = class {
  render(data) {
    // data에 대한 지식이 중복되고(단순히 코드가 동일한 것이 문제가 아니라 수정 포인트가 동일하다)
    const {
      task: { _title: title },
      list,
    } = data; // DonRenderder와 지식이 완전히 동일하다.
    console.log("------------------------");
    console.log("folder: ", title);
    this._render("", list);
  }

  _render(indent, list) {
    // 컴포지트 패턴 loop 구조가 동일하다.
    list.forEach(({ task: { _title: title }, list }) => {
      console.log(indent + title);
      this._render(indent + "-", list);
    });
  }
};
