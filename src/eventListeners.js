import PubSub from "./PubSub";
import { toDoList } from "./toDoList";
import projectFactory from "./project";

export default (function eventListeners() {
    const addEventListeners = function(button, object) {
        if(button.id == 'add-project-button') {
            button.addEventListener('click', broadcastAddPrj);
            return;          
        }

        if((button.id).match(/project-/g)) {
            button.addEventListener('click', broadcastPrjClick.bind(null, object));
            button.addEventListener('dblclick', editPrjName.bind(null, object));
            return;
        }

        if(button.id == 'add-task-button') {
            button.addEventListener('click', addTaskBtnClick);
        }

        if(button.classList.contains('delete-button')) {
            button.addEventListener('click', removeProject.bind(null, object));
        }

        if(button.classList.contains('task-delete-button')) {
            button.addEventListener('click', removeTask.bind(null, object));
        }

        // switch(button.id) {
        //     case 'add-project-button':
        //         button.addEventListener('click', broadcastAddPrj);
        //         break;
        //     case (button.id).match(/project-/g):
        //         button.addEventListener('click', broadcastPrjClick.bind(null, object));
        //         break;
        // }
    }

    // const removeEventListener = function() {

    // }


    const removeProject = function(project) {
        console.log(project);
        toDoList.removeProject(project);
    }

    const removeTask = function(task) {
        //task[0] is project, task[1] is task
        task[0].removeTask(task[1]);
    }
    
    const broadcastAddPrj = function() {
        let projectName = prompt('Project Name: ');
        PubSub.publish("AddPrjClick", projectName);
    }

    const broadcastPrjClick = function(project) {
        PubSub.publish("prjClick", project);
    }

    const editPrjName = function(project) {
        const newName = prompt("New project name:");
        project.editPrjName(newName);
        PubSub.publish("prjEdit", project);
    } 

    const addTaskBtnClick = function() {
        let taskName = prompt("Task Name:");
        const currentProject = toDoList.getCurrentProject();
        currentProject.addTask(taskName);
    }

    return {addEventListeners}
})();