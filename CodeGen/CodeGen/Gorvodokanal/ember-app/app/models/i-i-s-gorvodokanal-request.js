import { Model as RequestMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-request';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';

import dateNullable from '../utils/date-nullable';

let Model = Projection.Model.extend(Offline.ModelMixin, RequestMixin, {
  fullAddress: Ember.computed('address', function() {
    let address = this.get('address');
    let fullAddress = 'Ул. ';

    fullAddress += address.get('street') + ', ';
    fullAddress += 'д. ' + address.get('house');

    let building = address.get('building');
    fullAddress += building ? ', корп. ' + building : '';

    let porch = address.get('porch');
    fullAddress += porch ? ', под. ' + porch : '';

    let floor = address.get('floor');
    fullAddress += floor ? ', эт. ' + floor : '';

    let apartment = address.get('apartment');
    fullAddress += apartment ? ', кв. ' + apartment : '';

    return fullAddress;
  }),

  fullDuration: Ember.computed('tasks', function() {
    let taskList = this.get('tasks');
    let hours = 0;
    let minutes = 0;
    taskList.forEach(taskListElement => {
      let task = taskListElement.get('task');
      let taskDuration = task.get('planeDuration');
      let currentHours = taskDuration.getUTCHours();
      let currentMinutes = taskDuration.getUTCMinutes();
      hours += currentHours;
      minutes += currentMinutes;
    });

    let date = new Date();
    date = dateNullable(date);

    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
  }),

  importance: Ember.computed('tasks', function() {
    let taskList = this.get('tasks');

    let importance = 0;
    let importanceList = {
      'не срочно (0)': 0,
      'малая срочность (1)': 1,
      'средняя срочность (2)': 2,
      'высокая срочность (3)': 3,
      'как можно скорее (4)': 4
    }

    taskList.forEach(taskListElement => {
      let task = taskListElement.get('task');
      let taskImportance = task.get('importance');
      importance = Math.max(importance, importanceList[taskImportance]);
    });

    return importance;
  }),
});

defineNamespace(Model);
defineProjections(Model);
export default Model;
