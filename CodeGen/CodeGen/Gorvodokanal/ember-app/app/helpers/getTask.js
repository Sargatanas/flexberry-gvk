import Ember from 'ember';
import dateNullable from '../utils/date-nullable';

export function getTask(params) {
  let task = params[0];
  let taskDate = params[1];
  let currentDate = new Date(params[2]);
  let currentHour = Number(params[3]);

  let taskHour = taskDate.getUTCHours();

  if ((currentDate.getTime() === dateNullable(taskDate).getTime()) && (currentHour === taskHour)) {
    return [task];
  }
  return '';
}

export default Ember.Helper.helper(getTask);
