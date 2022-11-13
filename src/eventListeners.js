import PubSub from "./PubSub";

export default (function eventListeners() {
    function addEventListeners() {
        const prjBtn = document.querySelector('#add-project-button');
        prjBtn.addEventListener('click', broadcastAddPrj);

    }
    const broadcastAddPrj = function() {
        PubSub.publish("AddPrjClick");
    }
    return {addEventListeners}
})();