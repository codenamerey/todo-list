import PubSub from "./PubSub";

export default (function eventListeners() {
    function addEventListeners(button, object) {
        if(button.id == 'add-project-button') {
            button.addEventListener('click', broadcastAddPrj);
            return;          
        }

        if((button.id).match(/project-/g)) {
            button.addEventListener('click', broadcastPrjClick.bind(null, object));
            return;
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
    const broadcastAddPrj = function() {
        let projectName = prompt('Project Name: ');
        PubSub.publish("AddPrjClick", projectName);
    }

    const broadcastPrjClick = function(project) {
        PubSub.publish("prjClick", project);
    }

    return {addEventListeners}
})();