import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  content: DS.attr('string'),
  planeDuration: DS.attr('date'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      content: { presence: true }
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
    content: Projection.attr('Содержание', { index: 0 }),
    planeDuration: Projection.attr('Примерная длительность работ', { index: 1 })
  });
  modelClass.defineProjection('TaskL', 'i-i-s-gorvodokanal-task', {
    content: Projection.attr('Содержание', { index: 0 }),
    planeDuration: Projection.attr('Примерная длительность работ', { index: 1 })
  });
};
