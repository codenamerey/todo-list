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
        const aside = renderMenu();
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
        let projects = [...arguments];
        const h2 = renderElement('h2', `Today is ${getToday()}`);
        const aside = renderElement('aside', null);

        const ul = renderElement('ul', 'My projects', 'projects');
        projectsDiv = document.querySelector('#projects');
        const btn = renderElement('button', 'Add Task +', 'add-project-button');
        //check for projects
        if(projects.length == 0) {
            ul.appendChild((renderElement('p', 'None so far.')));
        }
        else {
            projects.forEach((item) => {
                let li = renderElement('li', item, null, 'menu-item');
                ul.appendChild(li);
            });
        }
        aside.append(h2, ul, btn);
        return aside;
    }

    const renderMain = function() {
        const main = renderElement('main', 'Please open a project', 'projects-task');
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

    const updateMenu = function() {
        console.log('Hello love');
    }
    // const renderMenu = function() {
    //     const aside = document.createElement('aside');
    //     const ul
    // }
    PubSub.subscribe("newProject", updateMenu);
    setTimeout(() => {
        eventListeners.addEventListeners();
    }, 100)
    return {initHomePage};
})();

export {UI};