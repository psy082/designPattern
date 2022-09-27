import { Task } from "./Task.v2.js";
import { ConsoleVisitor } from "./ConsoleVisitor.js";
import { Renderer } from "./Renderer.v2.js";

const folder = new Task("s3-4");
folder.add("2강교안작성");
folder.add("3강교안작성");

const { list } = folder.list("title");
list[1].task.add("ppt정리");
list[1].task.add("코드정리");

const { list: sublist } = list[1].task.list("title");
sublist[1].task.add("슬라이드마스터 정리");
sublist[1].task.add("디자인 개선");

const renderer = new Renderer(new ConsoleVisitor());
renderer.render(folder.list("title"));
// Renderer를 한번만 만들면 동일한 Renderer에게 그림을 그려달라는 요청을 계속 할 수 있다.
