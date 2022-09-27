import { Renderer } from "./Renderer.js";

export const ConsoleRenderer = class extends Renderer {
  _folder({ _title: title }) {
    console.log("---------------------------");
    console.log("folder: " + title);
    return "";
  }

  _parent(v, _) {
    return v;
  }

  _task(v, { _title: title }) {
    console.log(v, title);
    return v + "-";
  }
};
