import dateNullable from './date-nullable';

export default function getFullDuration(elements, name) {
  let hours = 0;
  let minutes = 0;

  elements.forEach((element) => {
    let currentDuration = element.get(name);
    let currentHours = currentDuration.getUTCHours();
    let currentMinutes = currentDuration.getUTCMinutes();
    hours += currentHours;
    minutes += currentMinutes;
  });

  let date = new Date();
  date = dateNullable(date);

  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);

  return date;
}
