import dateForm from './date-form';

export default function timeString(date, status, parameterUTC) {
  let currentDate = new Date(dateForm(date));
  let timeString = '';

  if (parameterUTC) {
    timeString += currentDate.getUTCHours() <= 9 ? '0' + currentDate.getUTCHours() : currentDate.getUTCHours();
  } else {
    timeString += currentDate.getHours() <= 9 ? '0' + currentDate.getHours() : currentDate.getHours();
  }

  timeString += ':';

  if (parameterUTC) {
    timeString += currentDate.getUTCMinutes() <= 9 ? '0' + currentDate.getUTCMinutes() : currentDate.getUTCMinutes();
  } else {
    timeString += currentDate.getMinutes() <= 9 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
  }

  if (status === 'full') {
    timeString += ':';

    if (parameterUTC) {
      timeString += currentDate.getUTCSeconds() <= 9 ? '0' + currentDate.getUTCSeconds() : currentDate.getUTCSeconds();
    } else {
      timeString += currentDate.getSeconds() <= 9 ? '0' + currentDate.getSeconds() : currentDate.getSeconds();
    }
  }

  return timeString;
}
