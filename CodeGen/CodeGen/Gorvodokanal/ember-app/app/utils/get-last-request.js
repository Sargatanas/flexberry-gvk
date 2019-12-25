import dateForm from './date-form';
import dateNullable from './date-nullable';
import getTasks from './get-tasks';
import getFullDuration from './get-full-duration';

export default function getLastRequest(requests, date, team) {
  let lastRequest = '';
  let lastDate = new Date(dateForm(date));

  requests.forEach((request) => {
    let requestDate = new Date(dateForm(request.get('dateStart')));

    if (dateNullable(lastDate).getTime() === dateNullable(requestDate).getTime()) {
      lastRequest = requestDate.getTime() >= lastDate.getTime() ? request : lastRequest;
      lastDate = requestDate;
    }
  });

  // Если в этот день нет заявок
  let startDate = new Date(dateForm(date));
  let startShift = team.get('shiftStart');
  startDate.setHours(startShift.getHours());
  startDate.setMinutes(startShift.getMinutes());
  startDate.setSeconds(startShift.getSeconds());

  let shift = 0;

  let endDate = new Date(dateForm(startDate));

  if (lastRequest) {
    let tasks =  getTasks(lastRequest);
      let fullDuration = getFullDuration(tasks, 'planeDuration');

      startDate = lastRequest.get('dateStart');

      endDate = new Date(dateForm(startDate));
      endDate.setHours(endDate.getHours() + fullDuration.getUTCHours());
      endDate.setMinutes(endDate.getMinutes() + fullDuration.getUTCMinutes());

      shift = 1;
  }

  lastRequest = {
    request: lastRequest,
    strat: startDate,
    end: endDate,
    shift: shift,
  }

  return lastRequest;
}
