import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function() {
    let projects = [];

    const addProject = function(name) {
        let project_temp = new project(name, new Date("2022-12-25"));
        projects.push(project_temp);
        PubSub.publish("newProject", projects);
    }

    PubSub.subscribe("AddPrjClick", addProject);
})();

export {toDoList}