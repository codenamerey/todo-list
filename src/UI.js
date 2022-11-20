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
        const aside = renderElement('aside', null);

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
                //listen for clicks
                eventListeners.addEventListeners(li, item);
                ul.appendChild(li);
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
        console.log(projects);
        for (const value in projects) {
            const li = renderElement('li', projects[value].getProjectName(), `project-${index}`, 'project-item');
            li.setAttribute('data-index', index);
            //If project is clicked, broadcast it.
            eventListeners.addEventListeners(li, projects[value]);
            // li.addEventListener('click', function() {
            //     PubSub.publish('prjClick', that);
            // });
            projectsDiv.appendChild(li);
            index++;
        }
    }

    const updateMain = function(tasks) {
        const taskDiv = document.querySelector('main > #task-div');
        const buttonDiv = document.querySelector('main > #button-div');  
        taskDiv.innerHTML = '';
        tasks.forEach((task) => {
            const p = renderElement('p', task.getName(), 'task-item');
            taskDiv.appendChild(p);
        });
        //if there is add-task-button already, forget it!
        if((buttonDiv.childNodes).length) return;
        const button = renderElement('button', 'Add Task +', 'add-task-button');
        eventListeners.addEventListeners(button);
        buttonDiv.appendChild(button);
    }

    const displayTasks = function(tasks) {
        updateMain(tasks);
    }

    const displayProject = function(project) {
        updateMain(project.getTasks());
    }
    // const renderMenu = function() {
    //     const aside = document.createElement('aside');
    //     const ul
    // }
    PubSub.subscribe("newProject", updateMenu);
    PubSub.subscribe("taskAdded", displayTasks);
    PubSub.subscribe("prjClick", displayProject);
    PubSub.subscribe("prjEdit", updateMenu.bind(null, toDoList.getProjects()));
    return {initHomePage};
})();

export {UI};