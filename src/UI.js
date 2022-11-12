const UI = (function() {
    const body = document.body;
    const initHomePage = function() {
        setupPage();
        // setupProjects();
    }

    const setupPage = function() {
        const header = renderHeader(`Whatchu Doin'? --- Browser-Based To-Do List`);
        const aside = renderMenu('Home', 'About');
        // const main = document.createElement('main');
        // const footer = document.createElement('footer');

        // body.append(header, aside, main, footer);
        body.append(header, aside);
    }

    const renderHeader = function(title) {
        const header = renderElement('header');
        const h1 = renderElement('h1', title);
        header.appendChild(h1);
        return header;
    }

    const renderMenu = function() {
        let items = [...arguments];
        const aside = renderElement('aside');
        const ul = renderElement('ul');
        items.forEach((item) => {
            let li = renderElement('li', item, null, 'menu-item');
            ul.appendChild(li);
        });
        aside.appendChild(ul);
        return aside;
    }

    const renderElement = function(el, text, id, className) {
        if(!(el || text || id || className)) return;
        const elem = document.createElement(el);
        if(text) elem.textContent = text;
        if(id) elem.id = id;
        if(className) elem.classList.add(className);
        return elem;
    }
    // const renderMenu = function() {
    //     const aside = document.createElement('aside');
    //     const ul
    // }
    return {initHomePage};
})();

export {UI};