import Ember from 'ember';
import timeString from '../utils/time-string';

export function getTimeString(params/*, hash*/) {
  let date = params[0];
  let status = params[1];
  let UTC = params[2];

  return timeString(date, status, UTC);
}

export default Ember.Helper.helper(getTimeString);
