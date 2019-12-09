import EditFormController from 'ember-flexberry/controllers/edit-form';

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
});
