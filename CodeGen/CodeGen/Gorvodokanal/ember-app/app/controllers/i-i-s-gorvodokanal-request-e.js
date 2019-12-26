import EditFormController from 'ember-flexberry/controllers/edit-form';
import Ember from 'ember';
import needSaveCurrentAgregator from 'ember-flexberry/utils/need-save-current-agregator';
import getCurrentAgregator from 'ember-flexberry/utils/get-current-agregator';

export default EditFormController.extend({
  parentRoute: 'i-i-s-gorvodokanal-request-l',

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'i-i-s-gorvodokanal-task-list+task':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'content',
            required: true,
            relationName: 'task',
            projection: 'TaskL',
            autocomplete: true,
          };
          break;

      }
    }

    return cellComponent;
  },

  actions: {
    clearAppoint(isAppont) {
      if (isAppont === 'не назначено') {
        let request = this.get('model');
        request.set('team', null);
        request.set('dateStart', null);
        request.set('isCompleted', false);
        request.set('dateEnd', null);
      }
    },

    clearCompleted(isCompleted) {
      if (!isCompleted) {
        let request = this.get('model');
        request.set('dateEnd', null);
      }
    },
  },
});
