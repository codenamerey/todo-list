import PubSub from "./PubSub";
import project from "./project";
const toDoList = (function() {
    let projects = [];
    let savedProjects = JSON.parse(localStorage.getItem('projects'));
    let current_project;
    const recallProjects = function() {
        savedProjects.forEach((savedProject) => {
            addInitialProjects(savedProject.projectName);
        });
    }

    const addInitialProjects = function(name) {
        let project_temp = project(name, new Date("2022-12-25"));
        projects.push(project_temp);
        console.log(projects);
    }

    const addProject = function(name) { 
        let project_temp = project(name, new Date("2022-12-25"));
        projects.push(project_temp);
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
    //recall saved projects
    // if(savedProjects) {
    //     savedProjects.forEach((savedProject) => {
    //         let project_temp = project(savedProject.projectName, new Date("2022-12-25"));
    //         projects.push(project_temp);
    //         PubSub.publish("newProject", projects);
    //     });
    // }

    PubSub.subscribe("AddPrjClick", addProject);
    PubSub.subscribe("prjClick", setCurrentProject);
    console.log(projects);
    if(savedProjects) recallProjects();
    return {getCurrentProject, getProjects}
})();

export {toDoList}