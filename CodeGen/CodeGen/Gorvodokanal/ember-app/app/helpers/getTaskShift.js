import Ember from 'ember';

export function getTaskShift(params) {
  let task = params[0];
  let freeCrit = !params[1];

  console.log(task);
  let minutes = freeCrit ? task.get('dateStart').getUTCMinutes() : task.get('planeDateStart').getUTCMinutes();

  return 30 * minutes / 60;
}

export default Ember.Helper.helper(getTaskShift);
