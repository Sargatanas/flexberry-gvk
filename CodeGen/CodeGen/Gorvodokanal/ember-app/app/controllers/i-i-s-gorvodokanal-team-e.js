import EditFormController from 'ember-flexberry/controllers/edit-form';
import Ember from 'ember';
import needSaveCurrentAgregator from 'ember-flexberry/utils/need-save-current-agregator';
import getCurrentAgregator from 'ember-flexberry/utils/get-current-agregator';

export default EditFormController.extend({
  parentRoute: 'i-i-s-gorvodokanal-team-l',

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'i-i-s-gorvodokanal-category-list+category':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'category',
            projection: 'CategoryL',
            autocomplete: true,
          };
          break;

      }
    }

    return cellComponent;
  },

  save(close, skipTransition) {
    this.send('dismissErrorMessages');

    this.onSaveActionStarted();
    this.get('appState').loading();

    let _this = this;

    let afterSaveModelFunction = () => {
      this.get('appState').success();
      _this.onSaveActionFulfilled();
      if (close) {
        this.get('appState').reset();
        _this.close(skipTransition);
      } else if (!skipTransition) {
        let routeName = _this.get('routeName');
        if (routeName.indexOf('.new') > 0) {
          let qpars = {};
          let queryParams = _this.get('queryParams');
          queryParams.forEach(function(item) {
            qpars[item] = this.get(item);
          }, _this);
          let transitionQuery = {};
          transitionQuery.queryParams = qpars;
          transitionQuery.queryParams.recordAdded = true;
          let parentParameters = {
            parentRoute: this.get('parentRoute'),
            parentRouteRecordId: this.get('parentRouteRecordId')
          };
          transitionQuery.queryParams.parentParameters = parentParameters;
          _this.transitionToRoute(routeName.slice(0, -4), _this.get('model'), transitionQuery);
        }
      }
    };

    let savePromise = this.get('model').save().then((model) => {
      let agragatorModel = getCurrentAgregator.call(this);
      if (needSaveCurrentAgregator.call(this, agragatorModel)) {
        return this._saveHasManyRelationships(model).then((result) => {
          if (result && Ember.isArray(result)) {
            let arrayWrapper = Ember.A();
            arrayWrapper.addObjects(result);
            let errors = arrayWrapper.filterBy('state', 'rejected');
            return errors.length > 0 ? Ember.RSVP.reject(errors) : agragatorModel.save().then(afterSaveModelFunction);
          } else {
            return agragatorModel.save().then(afterSaveModelFunction);
          }
        });
      } else {
        return this._saveHasManyRelationships(model).then((result) => {
          if (result && Ember.isArray(result)) {
            let arrayWrapper = Ember.A();
            arrayWrapper.addObjects(result);
            let errors = arrayWrapper.filterBy('state', 'rejected');
            if (errors.length > 0) {
              return Ember.RSVP.reject(errors);
            } else {
              afterSaveModelFunction();
            }
          } else {
            afterSaveModelFunction();
          }
        });
      }
    }).catch((errorData) => {
      this.get('appState').error();
      this.onSaveActionRejected(errorData);
      return Ember.RSVP.reject(errorData);
    }).finally((data) => {
      this.onSaveActionAlways(data);
    });

    return savePromise;
  },
});
