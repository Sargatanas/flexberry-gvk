import Ember from 'ember';

export function getCompletedStatus(params/*, hash*/) {
  let planeTime = params[0];
  let realTime = params[1];

  let planeDate = new Date();
  planeDate.setHours(planeTime.getHours());
  planeDate.setMinutes(planeTime.getMinutes());
  planeDate.setSeconds(planeTime.getSeconds());

  let realDate = new Date();
  realDate.setHours(realTime.getUTCHours());
  realDate.setMinutes(realTime.getUTCMinutes());
  realDate.setSeconds(realTime.getUTCSeconds());

  return realDate.getTime() <= planeDate.getTime() ? 'completed' : 'failed';
}

export default Ember.Helper.helper(getCompletedStatus);
