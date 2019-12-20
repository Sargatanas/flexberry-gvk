import Ember from 'ember';

export function getTaskList(params/*, hash*/) {
  let request = params[0];

  let tasks = [];
  let taskList = request.get('tasks');
  taskList.forEach(taskListElement => {
    let task = taskListElement.get('task');
    tasks.push(task);
  });

  return tasks;
}

export default Ember.Helper.helper(getTaskList);
