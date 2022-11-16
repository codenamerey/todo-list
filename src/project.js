import {format} from 'date-fns';
import PubSub from './PubSub';
import taskFactory from './task';

export default function projectFactory(name, due) {
    let projectName = name;
    let tasks = [{title: "Default Task", desc: "This is an example task", due:"Tomorrow", prio:0, getName: () => {return this.title;}}];
    const creationTime = format(new Date(), 'hh:mm, MM-dd-yyyy');
    let dueDate = format(due, 'LLLL dd, yyyy');
    const getDueDate = function() {
        return dueDate;
    }

    const getProjectName = function() {
        return projectName;
    }

    const getTasks = function() {
        return tasks;
    }

    const addTask = function(name) {
        let task = taskFactory(name, 'I HAVE NO IDEA', '2022-12-25', 0);
        tasks.push(task);
        PubSub.publish('taskAdded', tasks);
    }

    const editPrjName = function(name) {
        projectName = name;
    }

    return {projectName, getDueDate, getProjectName, getTasks, addTask, editPrjName};
}

// const proto = (function() {

// })();