import {format, formatDistanceToNow} from 'date-fns';

export default function projectFactory(name, due) {
    let projectName = name;
    let tasks = [];
    const creationTime = format(new Date(), 'hh:mm, MM-dd-yyyy');
    let dueDate = format(due, 'LLLL dd, yyyy');
    const getDueDate = function() {
        return dueDate;
    }

    return {getDueDate};
}