import Ember from 'ember';
import getTasks from '../utils/get-tasks';

export function getTaskList(params/*, hash*/) {
  let request = params[0];

  return getTasks(request);
}

export default Ember.Helper.helper(getTaskList);
