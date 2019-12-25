import Ember from 'ember';
import dateNullable from '../utils/date-nullable';

export function getTask(params) {
  let task = params[0];
  let currentDate = new Date(params[1]);
  let currentHour = Number(params[2]);

  let taskDate = task.get('dateStart') ? task.get('dateStart') : task.get('planeDateStart');

  if (taskDate) {
    let taskHour = taskDate.getUTCHours();

    if ((currentDate.getTime() === dateNullable(taskDate).getTime()) && (currentHour === taskHour)) {
      return [task];
    }
  } 
  return '';
}

export default Ember.Helper.helper(getTask);
