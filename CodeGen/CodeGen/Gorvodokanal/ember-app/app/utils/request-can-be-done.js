import dateNullable from './date-nullable';
import dateForm from './date-form';
import getFullDuration from './get-full-duration';
import getTasks from './get-tasks';

export default function requestCanBeDone(team, nonselectedRequests, selectedRequests, date) {
  let currentDate = new Date(dateForm(date));
  let freeRequests = [...nonselectedRequests];
  let teamRequests = [...selectedRequests];

  teamRequests = setFullDuration(teamRequests);
  teamRequests = setImportance(teamRequests);
  teamRequests = setTimeStart(teamRequests);

  freeRequests = setFullDuration(freeRequests);
  freeRequests = setImportance(freeRequests);

  /* Сортировка */
  teamRequests.sort((a, b) => {
    return a.get('timeStart') - b.get('timeStart');
  });
  freeRequests.sort((a, b) => {
    return b.get('importance') === a.get('importance') ?
           a.get('fullDuration').getTime() - b.get('fullDuration').getTime() :
           b.get('importance') - a.get('importance');
  });

  let requestList = [];
  teamRequests.forEach((request) => {
    requestList.push(getRequestConfines(request, currentDate));
  });

  /* Оценка свободных временных промежутков */
  let timeSpaces = getTimespaces(teamRequests, date, team);

  /* Оценка возможных позиций заявок */
  let freeRequestList = [];
  freeRequests.forEach((freeRequest) => {
    let fullDuration = freeRequest.get('fullDuration');

    let requestInfo = {
      request: freeRequest,
      timeDuration: fullDuration,
      planeTimeSpaces: []
    };

    let shift = {
      hours: fullDuration.getHours(),
      minutes: fullDuration.getMinutes(),
      seconds: fullDuration.getSeconds(),
    };

    timeSpaces.forEach((timeSpace) => {
      let start = new Date(dateForm(timeSpace.start));
      let end = new Date(dateForm(timeSpace.end));
      let current = new Date(dateForm(timeSpace.start));

      current = setTimeProperties(start, current, shift);
      if (current.getTime() < end.getTime()) {
        requestInfo.planeTimeSpaces.push(timeSpace);
      }
    });

    if (requestInfo.planeTimeSpaces.length !== 0) {
      freeRequestList.push(requestInfo);
    }
  });
  return freeRequestList;
}

/* Расчет полной плановой длительности работ */
function setFullDuration(requests) {
  requests.forEach((request) => {
    let tasks = getTasks(request);

    let fullDuration = getFullDuration(tasks, 'planeDuration');
    fullDuration.setHours(fullDuration.getUTCHours());

    request.set('fullDuration', fullDuration);
  });

  return requests;
}

/* Расчет степени срочности заявки */
function setImportance(requests) {
  requests.forEach((request) => {
    let tasks = getTasks(request);
    let importance = 0;

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
      importance = Math.max(current, importance);
    });
    request.set('importance', importance);
  });

  return requests;
}

/* Расчет времени начала */
function setTimeStart(requests) {
  requests.forEach((request) => {
    let hours = request.get('dateStart').getUTCHours();
    let minutes = request.get('dateStart').getUTCMinutes();
    let fullTime = hours * 60 + minutes;

    request.set('timeStart', fullTime);
  });

  return requests;
}

/* Получение границ времени выполнения для задачи */
function getRequestConfines(request, currentDate) {
  let requestDuration = request.get('fullDuration');

  let requestStart = '';
  let requestEnd = '';
  if (request.get("dateStart")) {
    requestStart = new Date(dateForm(currentDate));
    requestStart.setHours(request.get("dateStart").getHours());
    requestStart.setMinutes(request.get("dateStart").getMinutes());

    requestEnd = new Date(dateForm(currentDate));
    requestEnd.setHours(requestStart.getHours() + requestDuration.getHours());
    requestEnd.setMinutes(requestStart.getMinutes() + requestDuration.getMinutes());
  }

  return {
    request: request,
    start: requestStart,
    end: requestEnd
  }
}

/* Перенос времени */
function setTimeProperties(input, output, shift) {
  output.setHours(input.getHours() + shift.hours);
  output.setMinutes(input.getMinutes() + shift.minutes);
  output.setSeconds(input.getSeconds() + shift.seconds);
  return output;
}

/* Свободные временные промежутки */
function getTimespaces(requests, date, team) {
  let shiftStart = dateNullable(new Date(dateForm(date)));
  shiftStart.setHours(team.get('shiftStart').getHours());
  let shiftEnd = dateNullable(new Date(dateForm(date)));
  shiftEnd.setHours(team.get('shiftEnd').getHours());
  let timeSpaces = [];

  for (let i = -1; i < requests.length; i++) {
    let start = dateNullable(new Date(dateForm(date)));
    let end = dateNullable(new Date(dateForm(date)));
    let shift = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (i === -1) {

      shift.hours = 0;
      shift.minutes = 0;
      shift.seconds = 0;
      start = setTimeProperties(shiftStart, start, shift);

      shift.hours = 0;
      shift.minutes = 0;
      shift.seconds = 0;
      end = setTimeProperties(shiftEnd, end, shift);

      if (requests.length !== 0) {
        shift.hours = -1;
        shift.minutes = 0;
        shift.seconds = 0;
        let requestEnd = new Date(dateForm(requests[i + 1].get('dateStart')));
        end = setTimeProperties(requestEnd, end, shift);
      }
      
    } else if (i === requests.length - 1) {

      shift.hours = requests[i].get('fullDuration').getHours() + 1;
      shift.minutes = requests[i].get('fullDuration').getMinutes();
      shift.seconds = requests[i].get('fullDuration').getSeconds();
      let requestStart = new Date(dateForm(requests[i].get('dateStart')));
      start = setTimeProperties(requestStart, start, shift);

      shift.hours = 0;
      shift.minutes = 0;
      shift.seconds = 0;
      end = setTimeProperties(shiftEnd, end, shift);

    } else {

      shift.hours = requests[i].get('fullDuration').getHours() + 1;
      shift.minutes = requests[i].get('fullDuration').getMinutes();
      shift.seconds = requests[i].get('fullDuration').getSeconds();
      let requestStart = new Date(dateForm(requests[i].get('dateStart')));
      start = setTimeProperties(requestStart, start, shift);

      shift.hours = -1;
      shift.minutes = 0;
      shift.seconds = 0;
      let requestEnd = new Date(dateForm(requests[i + 1].get('dateStart')));
      end = setTimeProperties(requestEnd, end, shift);
    }

    if (start.getTime() < end.getTime()) {
      timeSpaces.push({
        start: start,
        end: end
      });
    }
  }

  return timeSpaces;
}
