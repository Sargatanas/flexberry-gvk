import Ember from 'ember';

export function comparisonDates(params) {
  let currentDate = params[0];
  let comparingDate = params[1];

  if (currentDate.getTime() > comparingDate.getTime()) {
    return 'last';
  } else if (currentDate.getTime() === comparingDate.getTime()) {
    return 'current';
  }

  return '';
}

export default Ember.Helper.helper(comparisonDates);
