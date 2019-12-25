export default function getTasks(request) {
  let tasks = [];

  let taskList = request.get('tasks');
  taskList.forEach(taskListElement => {
    let task = taskListElement.get('task');
    tasks.push(task);
  });

  return tasks;
}
