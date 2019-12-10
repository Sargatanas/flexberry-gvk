import Ember from 'ember';
import dateString from '../utils/date-string';
import dateShift from '../utils/date-shift';

export function getDateString(params) {
    let date = params[0];
    let index = params[1];

    let currentDate = index ? dateShift(index, date) : date;
    return dateString(currentDate);
}

export default Ember.Helper.helper(getDateString);
