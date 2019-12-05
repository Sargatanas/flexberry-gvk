import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number'),
  content: DS.attr('string'),
  planeDuration: DS.attr('date'),
  request: DS.belongsTo('i-i-s-gorvodokanal-request', { inverse: 'tasks', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      code: { presence: true },
      content: { presence: true },
      planeDuration: { datetime: true },
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
  modelClass.defineProjection('TaskE', 'i-i-s-gorvodokanal-task', {
    code: Projection.attr('Код задачи', { index: 0 }),
    content: Projection.attr('Детали задачи', { index: 1 }),
    planeDuration: Projection.attr('Примерная длительность работ', { index: 2 })
  });
};
