import Ember from 'ember';

export function getErrorsStyle(params) {
  let errors = params[0];

  if (errors && (errors.length === 0)) {
    return 'form-header-errors_none';
  }
  return '';
}

export default Ember.Helper.helper(getErrorsStyle);
