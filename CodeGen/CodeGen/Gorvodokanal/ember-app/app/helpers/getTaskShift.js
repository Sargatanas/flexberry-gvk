import Ember from 'ember';

export function getTaskShift(params) {
  let request = params[0];
  let freeCrit = !params[1];

  let minutes = freeCrit ? request.get('dateStart').getUTCMinutes() : 0;

  return 30 * minutes / 60;
}

export default Ember.Helper.helper(getTaskShift);
