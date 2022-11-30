import { format } from "date-fns";
import PubSub from "./PubSub";
import taskFactory from "./task";

export default function projectFactory(name, due) {
  let projectName = name;
  let tasks = [];
  const creationTime = format(new Date(), "hh:mm, MM-dd-yyyy");
  let dueDate = format(due, "LLLL dd, yyyy");
  const getDueDate = function () {
    return dueDate;
  };

  const getProjectName = function () {
    return projectName;
  };

  const getTasks = function () {
    return tasks;
  };

  const addInitialTask = function (name) {
    let task = taskFactory(name, "I HAVE NO IDEA", "2022-12-25", 0);
    tasks.push(task);
  };

  const addTask = function (project, name) {
    let task = taskFactory(name, "I HAVE NO IDEA", "2022-12-25", 0);
    tasks.push(task);
    PubSub.publish("taskAdded", [project, tasks]);
  };

  const removeTask = function (project, task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    PubSub.publish("taskRemove", [project, tasks]);
  };

  const editPrjName = function (name) {
    projectName = name;
  };

  return {
    projectName,
    dueDate,
    tasks,
    getDueDate,
    getProjectName,
    getTasks,
    addTask,
    editPrjName,
    addInitialTask,
    removeTask,
  };
}
