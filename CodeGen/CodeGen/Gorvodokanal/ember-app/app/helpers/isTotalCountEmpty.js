import Ember from 'ember';

export function isTotalCountEmpty(params) {
  let count = params[0];
  let selectedDate = params[1];
  let currentDate = params[2];

  return (count !== 0) || (selectedDate === currentDate);
}

export default Ember.Helper.helper(isTotalCountEmpty);
