import dateNullable from './date-nullable';
import dateForm from './date-form';
import getFullDuration from './get-full-duration';

export default function requestCanBeDone(team, requests, selectedRequests, date) {
  let requestList = [...requests];
  requestList = sortTaskList(requestList);

  let teamRequests = [...selectedRequests];

  let lastRequest = getLastRequest(teamRequests, date);
  let isEmptyDay = lastRequest ? false : true;

  let currentDate = date;
  currentDate = dateNullable(currentDate);

  let shiftStart = new Date(dateForm(currentDate));
  shiftStart.setHours(team.get('shiftStart').getHours());
  let shiftEnd = new Date(dateForm(currentDate));
  shiftEnd.setHours(team.get('shiftEnd').getHours() + 1);

  lastRequest = lastRequest ? getRequestInfo(lastRequest, currentDate) : getRequestInfo(lastRequest, currentDate, shiftStart);
  console.log(lastRequest);

  let tasksPlane = [];
  requestList.forEach(request => {
    let requestStart = dateNullable(new Date(dateForm(currentDate)));
    requestStart.setHours(lastRequest.end.getHours());

    if (!isEmptyDay) {
      requestStart.setHours(requestStart.getHours() + 1);
    }
    requestStart.setMinutes(lastRequest.end.getMinutes());

    let requestInfo = getRequestInfo(request, currentDate, requestStart);

    if (requestInfo.end.getTime() <= shiftEnd.getTime()) {
      lastRequest = requestInfo;
      isEmptyDay = false;

      console.log(request.get('index'), requestInfo.end.getTime(), shiftEnd.getTime());
      request.set('planeDateStart', requestStart);
      request.save();

      tasksPlane.push(request);
    }
  });

  return tasksPlane;
}

function sortTaskList(requestList) {
  let sortTaskList = [];

  requestList.forEach((request, index) => {
    let taskList = request.get('tasks');
    let tasks = [];

    taskList.forEach((taskListElement) => {
      tasks.push(taskListElement.get('task'));
    });

    let fullDuration = getFullDuration(tasks, 'planeDuration');
    let duration = {
      hours: fullDuration.getHours(),
      minutes: fullDuration.getMinutes(),
    }

    let time = duration.hours * 60 + duration.minutes;

    let importance = getImportance(tasks);

    sortTaskList.push({
      index: index,
      importance: importance,
      time: time
    });
  });

  sortTaskList.sort((a, b) => {
    return b.importance === a.importance ? a.time - b.time : b.importance - a.importance;
  });

  let newTaskList = [];
  sortTaskList.forEach(sortTask => {
    newTaskList.push(requestList[sortTask.index]);
  });

  return newTaskList;
}

function getImportance(tasks) {
  let summryImpotance = 0;
  tasks.forEach((task) => {
    let current = 0;
    switch (task.get('importance')) {
      case 'не срочно (0)':
        current = 0;
        break;
      case 'малая срочность (1)':
        current = 1;
        break;
      case 'средняя срочность (2)':
        current = 2;
        break;
      case 'высокая срочность (3)':
        current = 3;
        break;
      case 'как можно скорее (4)':
        current = 4;
        break;
    }
    summryImpotance = Math.max(current, summryImpotance);
  });
  return summryImpotance;
}

function getLastRequest(requests, date) {
  let lastRequest = '';
  let lastDate = new Date(dateForm(date));

  requests.forEach((request) => {
    let requestDate = new Date(dateForm(request.get('dateStart')));

    if (dateNullable(lastDate).getTime() === dateNullable(requestDate).getTime()) {
      lastRequest = requestDate.getTime() >= lastDate.getTime() ? request : lastRequest;
      lastDate = requestDate;
    }
  });

  return lastRequest;
}

function getRequestInfo(request, currentDate, dateStart) {
  let requestDuration = {
    hours: 0,
    minutes: 0
  }
  if (request) {
    let taskList = request.get('tasks');
    let tasks = [];

    taskList.forEach((taskListElement) => {
      tasks.push(taskListElement.get('task'));
    });

    let fullDuration = getFullDuration(tasks, 'planeDuration');
    requestDuration = {
      hours: fullDuration.getUTCHours(),
      minutes: fullDuration.getUTCMinutes(),
    }
  }

  let requestStart = '';
  if (dateStart) {
    requestStart = dateStart;
  } else {
    requestStart = new Date(dateForm(currentDate));
    requestStart.setHours(request.get("dateStart").getHours());
    requestStart.setMinutes(request.get("dateStart").getMinutes());
  }

  let requestEnd = new Date(dateForm(currentDate));
  requestEnd.setHours(requestStart.getHours() + requestDuration.hours);
  requestEnd.setMinutes(requestStart.getMinutes() + requestDuration.minutes);

  return {
    request: request,
    start: requestStart,
    end: requestEnd
  }
}
