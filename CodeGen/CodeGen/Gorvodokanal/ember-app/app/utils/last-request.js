export default function lastRequest(requests, date) {
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
