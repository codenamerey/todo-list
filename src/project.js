import {format} from 'date-fns';

export default function projectFactory(name, due) {
    let projectName = name;
    let tasks = [{title: "Default Task", desc: "This is an example task", due:"Tomorrow", prio:0}];
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

    return {getDueDate, getProjectName, getTasks};
}