import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function () {
  let projects = [];
  let savedProjects = JSON.parse(localStorage.getItem("projects"));
  let current_project;
  const recallProjects = function () {
    savedProjects.forEach((savedProject) => {
      addInitialProjects(savedProject.projectName, savedProject.tasks);
    });
  };

  const addInitialProjects = function (name, tasks) {
    let project_temp = project(name, new Date("2022-12-25"));
    if (tasks) {
      tasks.forEach((task) => {
        project_temp.addInitialTask(task.name);
      });
      projects.push(project_temp);
      return;
    }
    projects.push(project_temp);
  };

  const addProject = function (name) {
    let project_temp = project(name, new Date("2022-12-25"));
    projects.push(project_temp);
    localStorage.setItem("projects", JSON.stringify(projects));
    PubSub.publish("newProject", projects);
  };

  const removeProject = function (project) {
    console.log(project);
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    PubSub.publish("projectRemove");
  };

  const getCurrentProject = function () {
    return current_project;
  };

  const setCurrentProject = function (project) {
    current_project = project;
  };

  const getProjects = function () {
    return projects;
  };
  //recall saved projects
  // if(savedProjects) {
  //     savedProjects.forEach((savedProject) => {
  //         let project_temp = project(savedProject.projectName, new Date("2022-12-25"));
  //         projects.push(project_temp);
  //         PubSub.publish("newProject", projects);
  //     });
  // }
  const updateLocalStorage = function () {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const updateLocalStorageOnPrjEdit = function (project) {
    //change the project name edit first to projects array, then save it.
    project.projectName = project.getProjectName();
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  PubSub.subscribe("AddPrjClick", addProject);
  PubSub.subscribe("prjClick", setCurrentProject);
  PubSub.subscribe("taskAdded", updateLocalStorage);
  PubSub.subscribe("prjEdit", updateLocalStorageOnPrjEdit);
  PubSub.subscribe("projectRemove", updateLocalStorage);
  PubSub.subscribe("taskRemove", updateLocalStorage);
  if (savedProjects) recallProjects();
  return { getCurrentProject, getProjects, removeProject };
})();

export { toDoList };
