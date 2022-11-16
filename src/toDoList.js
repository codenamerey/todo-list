import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function() {
    let projects = [];
    let current_project;

    const addProject = function(name) {
        projects = (localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : projects; 
        let project_temp = new project(name, new Date("2022-12-25"));
        projects.push(project_temp);
        console.log(projects);
        localStorage.setItem('projects', JSON.stringify(projects));
        PubSub.publish("newProject", projects);
    }

    const getCurrentProject = function() {
        return current_project;
    }

    const setCurrentProject = function(project) {
        current_project = project;
    }

    const getProjects = function() {
        return projects;
    }

    PubSub.subscribe("AddPrjClick", addProject);
    PubSub.subscribe("prjClick", setCurrentProject);
    return {getCurrentProject, getProjects}
})();

export {toDoList}