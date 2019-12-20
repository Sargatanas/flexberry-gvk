import Ember from 'ember';

export function getTaskShift(params) {
  let task = params[0];
  let minutes = task.get('dateStart').getUTCMinutes();
  return 30 * minutes / 60;
}

export default Ember.Helper.helper(getTaskShift);
