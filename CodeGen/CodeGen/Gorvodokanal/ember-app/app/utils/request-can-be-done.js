import dateNullable from './date-nullable';
import dateForm from './date-form';
import getFullDuration from './get-full-duration';

export default function requestCanBeDone(team, requests, selectedRequests, date) {
  let requestList = [...requests];
  requestList = sortTaskList(requestList);

  let teamRequests = [...selectedRequests];

  let lastRequest = getLastRequest(teamRequests, date);

  let currentDate = date;
  currentDate = dateNullable(currentDate);

  let shiftEnd = new Date(currentDate);
  shiftEnd.setUTCHours(team.get('shiftEnd').getUTCHours());

  lastRequest = lastRequest ? getRequestInfo(lastRequest, currentDate) : getRequestInfo(lastRequest, currentDate, currentDate);
  let isEmptyDay = lastRequest ? false : true;

  let tasksPlane = [];
  requestList.forEach(request => {
    let requestStart = dateNullable(new Date(dateForm(currentDate)));
    requestStart.setUTCHours(lastRequest.end.getUTCHours());

    if (!isEmptyDay) {
      requestStart.setUTCHours(requestStart.getUTCHours() + 1);
    }
    requestStart.setUTCMinutes(lastRequest.end.getUTCMinutes());

    let requestInfo = getRequestInfo(request, currentDate, requestStart);

    if (requestInfo.end.getTime() <= shiftEnd.getTime()) {
      lastRequest = requestInfo;
      isEmptyDay = false;

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
      hours: fullDuration.getUTCHours(),
      minutes: fullDuration.getUTCMinutes(),
    }

    let time = duration.hours * 60 + duration.minutes;

    let importance = getSummmaryImportance(tasks);

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

function getSummmaryImportance(tasks) {
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

  requests.forEach((request) => {
    let requestDate = new Date(request.get('dateStart'));
    requestDate = dateNullable(requestDate);

    if (requestDate.getTime() === date.getTime()) {
      lastRequest = lastRequest === '' ? request : lastRequest;

      let lastTime = lastRequest.get("dateStart").getUTCHours() * 60 + lastRequest.get("dateStart").getUTCMinutes();
      let currentTime = request.get("dateStart").getUTCHours() * 60 + request.get("dateStart").getUTCMinutes();

      lastRequest = currentTime > lastTime ? request : lastRequest;
    }
  });

  return lastRequest;
}

function getRequestInfo(request, currentDate, start) {
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
  if (start) {
    requestStart = start;
  } else {
    requestStart = new Date(dateForm(currentDate));
    requestStart.setUTCHours(request.get("dateStart").getUTCHours());
    requestStart.setUTCMinutes(request.get("dateStart").getUTCMinutes());
  }

  let requestEnd = new Date(currentDate);
  requestEnd.setUTCHours(requestStart.getUTCHours() + requestDuration.hours);
  requestEnd.setUTCMinutes(requestStart.getUTCMinutes() + requestDuration.minutes);

  return {
    request: request,
    start: requestStart,
    end: requestEnd
  }
}
