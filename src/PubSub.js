export default (function PubSub() {
    let events = {
    }

    const publish = function(eventName, data) {
        if(!(events[eventName])) return;
        events[eventName].forEach((handler) => {
            handler(data);
        });
    }

    const subscribe = function(eventName, handler) {
        events[eventName] = (events[eventName]) ? events[eventName] : [];
        events[eventName].push(handler);
    }

    const unsubscribe = function(eventName, handler) {
        if(!events[eventName]) return;
        for(let eventI = 0; events[eventName] > eventI; eventI++) {
            if(events[eventName][eventI] == handler) {
                events[eventName].splice(eventI, 1);
            }
        }
    }

    return {publish, subscribe, unsubscribe};
})();