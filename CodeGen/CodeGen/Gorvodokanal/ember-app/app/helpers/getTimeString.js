import Ember from 'ember';
import timeString from '../utils/time-string';

export function getTimeString(params/*, hash*/) {
  let date = params[0];
  let status = params[1];
  let parameterUTC = params[2];

  if (date) {
    return timeString(date, status, parameterUTC);
  }
}

export default Ember.Helper.helper(getTimeString);
