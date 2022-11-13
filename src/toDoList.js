import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function() {
    let projects = [];

    const addProject = function(name) {
        console.log('I am in');
        let project_temp = new project(name);
        projects.push(project_temp);
        PubSub.publish("newProject", projects);
    }

    PubSub.subscribe("AddPrjClick", addProject);
})();

export {toDoList}