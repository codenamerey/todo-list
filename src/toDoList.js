import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function() {
    let projects = [];
    let current_project;

    const addProject = function(name) {
        let project_temp = new project(name, new Date("2022-12-25"));
        projects.push(project_temp);
        PubSub.publish("newProject", projects);
    }

    const getCurrentProject = function() {
        return current_project;
    }

    const setCurrentProject = function(project) {
        current_project = project;
    }

    PubSub.subscribe("AddPrjClick", addProject);
    PubSub.subscribe("prjClick", setCurrentProject);

    return {getCurrentProject}
})();

export {toDoList}