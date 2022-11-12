import {format} from 'date-fns';

const getToday = function() {
    return format(new Date(), 'LLLL dd, yyyy');
}

export {getToday};