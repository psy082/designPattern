import { Visitor } from "./Visitor.js";

export const ConsoleVisitor = class extends Visitor {
  folder({ _title: title }) {
    console.log("------------");
    console.log("folder: " + title);
    return "";
  }
  parent(v, _) {
    return v;
  }
  task(v, { _title: title }) {
    console.log(v, title);
    return v + "-";
  }
};
