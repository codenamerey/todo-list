export default function taskFactory(name, desc, due, prio) {
    const getName = function() {
        return name;
    }

    const getDesc = function() {
        return desc;
    }

    const getDue = function() {
        return due;
    }

    const getPrio = function() {
        return prio;
    }

    return {getName, getDesc, getDue, getPrio};
}