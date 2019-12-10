export default function dateForm(date) {
  let formDate = date.getFullYear();
  formDate += '-';
  formDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  formDate += '-';
  formDate += date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
  formDate += ' ';
  formDate += date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
  formDate += ':';
  formDate += date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
  formDate += ':';
  formDate += date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();

  return formDate;
}
