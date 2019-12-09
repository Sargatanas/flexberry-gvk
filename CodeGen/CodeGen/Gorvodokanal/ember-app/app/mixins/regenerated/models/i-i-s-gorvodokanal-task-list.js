import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  task: DS.belongsTo('i-i-s-gorvodokanal-task', { inverse: null, async: false }),
  request: DS.belongsTo('i-i-s-gorvodokanal-request', { inverse: 'tasks', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      task: { presence: true },
      request: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});

export function defineNamespace(modelClass) {
  modelClass.reopenClass({
    namespace: 'IIS.Gorvodokanal',
  });
}

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('TaskListE', 'i-i-s-gorvodokanal-task-list', {
    task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {

    }, { index: 0, displayMemberPath: 'content' })
  });
};
