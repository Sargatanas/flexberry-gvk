import Ember from 'ember';
import dateString from '../utils/date-string';
import timeString from '../utils/time-string';

export function getDateTimeString(params/*, hash*/) {
  let date = params[0];

  return dateString(date) + ' ' + timeString(date);
}

export default Ember.Helper.helper(getDateTimeString);
