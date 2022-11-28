import { getToday } from "./date";
import PubSub from "./PubSub";
import eventListeners from "./eventListeners";
import { toDoList } from "./toDoList";

const UI = (function() {
    let projectsDiv;
    const body = document.body;
    const initHomePage = function() {
        setupPage();
        // setupProjects();
    }

    const setupPage = function() {
        const header = renderHeader(`Whatchu Doin'? --- Browser-Based To-Do List`);
        const aside = renderMenu(toDoList.getProjects());
        const main = renderMain();
        // const footer = document.createElement('footer');

        // body.append(header, aside, main, footer);
        body.append(header, aside, main);
    }

    const renderHeader = function(title) {
        const header = renderElement('header');
        const h1 = renderElement('h1', title);
        header.appendChild(h1);
        return header;
    }

    const renderMenu = function() {
        let projects = [...arguments][0];
        const h2 = renderElement('h2', `Today is ${getToday()}`);
        const aside = renderElement('aside', null, 'projects-n-tasks');

        const ul = renderElement('ul', 'My projects', 'projects');
        const btn = renderElement('button', 'Add Project +', 'add-project-button');
        eventListeners.addEventListeners(btn);
        //check for projects
        if(!(projects[0])) {
            projects.splice(0, 1);
            ul.appendChild((renderElement('p', 'None so far.')));
        }
        else {
            projects.forEach((item, index) => {
                let li = renderElement('li', item.getProjectName(), `project-${index}`, 'project-item');
                const del = renderElement('span', 'X', null,'delete-button');
                //listen for clicks
                eventListeners.addEventListeners(li, item);
                //delete project on click
                eventListeners.addEventListeners(del, item);
                ul.append(li, del);
            })
            // projects.forEach((item) => {
            //     let li = renderElement('li', item, null, 'menu-item');
            //     ul.appendChild(li);
            // });
        }
        aside.append(h2, ul, btn);
        return aside;
    }

    const renderMain = function() {
        const main = renderElement('main');
        const taskDiv = renderElement('div', 'Please open a project', 'task-div');
        const buttonDiv = renderElement('div', null, 'button-div');
        main.append(taskDiv, buttonDiv)
        return main;
    }

    const renderElement = function(el, text, id, className) {
        if(!(el || text || id || className)) return;
        const elem = document.createElement(el);
        if(text) elem.textContent = text;
        if(id) elem.id = id;
        if(className) elem.classList.add(className);
        return elem;
    }

    const updateMenu = function(projects) {
        const projectsDiv = document.querySelector('#projects');
        projectsDiv.innerHTML = '';
        let index = 0;
        for (const value in projects) {
            const li = renderElement('li', projects[value].getProjectName(), `project-${index}`, 'project-item');
            const del = renderElement('span', 'X', null, 'delete-button');
            li.setAttribute('data-index', index);
            console.log(projects);
            console.log(projects[value].getProjectName())
            //If project is clicked, broadcast it.
            eventListeners.addEventListeners(li, projects[value]);
            //If delete button is clicked, delete a project
            eventListeners.addEventListeners(del, projects[value]);
            // li.addEventListener('click', function() {
            //     PubSub.publish('prjClick', that);
            // });
            projectsDiv.append(li, del);
            index++;
        }
    }

    const updateMain = function(project, tasks) {
        const taskDiv = document.querySelector('main > #task-div');
        const buttonDiv = document.querySelector('main > #button-div');  
        taskDiv.innerHTML = '';
        if(tasks) {
            tasks.forEach((task) => {
                const p = renderElement('p', task.getName(), 'task-item');
                const del = renderElement('span', 'X', null, 'task-delete-button');
                eventListeners.addEventListeners(del, [project, task]);
                taskDiv.append(p, del);
            });
        }
        //if there is add-task-button already, forget it!
        if((buttonDiv.childNodes).length) return;
        const button = renderElement('button', 'Add Task +', 'add-task-button');
        eventListeners.addEventListeners(button);
        buttonDiv.appendChild(button);
    }

    const displayTasks = function() {
        //args [0] is project, args[1] is tasks
        updateMain(arguments[0][0], arguments[0][1]);
    }

    const displayProject = function(project) {
        updateMain(project, project.getTasks());
    }
    // const renderMenu = function() {
    //     const aside = document.createElement('aside');
    //     const ul
    // }
    PubSub.subscribe("newProject", updateMenu);
    PubSub.subscribe("taskAdded", displayTasks);
    PubSub.subscribe("taskRemove", displayTasks);
    PubSub.subscribe("prjClick", displayProject);
    PubSub.subscribe("projectRemove", updateMenu.bind(null, toDoList.getProjects()));
    PubSub.subscribe("prjEdit", updateMenu.bind(null, toDoList.getProjects()));
    return {initHomePage};
})();

export {UI};