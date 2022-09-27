import { Task } from "./Task.v2.js";
import { Priority, Member } from "./TaskView.js";
import { Renderer, Dom } from "./Renderer.v4.js";

const folder = new Task("s3-4");
folder.add("2강교안작성");
folder.add("3강교안작성");

const { list } = folder.list("title");
list[1].task.add("ppt정리");
list[1].task.add("코드정리");

const { list: sublist } = list[1].task.list("title");
sublist[1].task.add("슬라이드마스터 정리");
sublist[1].task.add("디자인 개선");

const dom = new Dom("#root");
dom.taskView(new Member("hika", "summer"), new Priority());

const renderer = new Renderer(dom);
renderer.render(folder.list("title"));
