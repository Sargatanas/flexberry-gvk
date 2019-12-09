import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number', { defaultValue: 1, ordered: true }),
  content: DS.attr('string'),
  planeDurationtHour: DS.attr('number', { defaultValue: 0 }),
  planeDurationMinutes: DS.attr('number', { defaultValue: 0 }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      code: { presence: true },
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
    code: Projection.attr('Идентификатор', { index: 0 }),
    content: Projection.attr('Содержание', { index: 1 }),
    planeDurationtHour: Projection.attr('Часы', { index: 2 }),
    planeDurationMinutes: Projection.attr('Минуты', { index: 3 })
  });
  modelClass.defineProjection('TaskL', 'i-i-s-gorvodokanal-task', {
    code: Projection.attr('Идентификатор', { index: 0 }),
    content: Projection.attr('Содержание', { index: 1 }),
    planeDurationtHour: Projection.attr('Часы', { index: 2 }),
    planeDurationMinutes: Projection.attr('Минуты', { index: 3 })
  });
};
