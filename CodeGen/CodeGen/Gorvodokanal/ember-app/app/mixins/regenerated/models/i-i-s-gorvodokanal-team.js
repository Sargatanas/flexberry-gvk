import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  shiftStart: DS.attr('date'),
  shiftEnd: DS.attr('date'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      index: { presence: true }
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
  modelClass.defineProjection('TeamE', 'i-i-s-gorvodokanal-team', {
    index: Projection.attr('Номер бригады', { index: 0 }),
    shiftStart: Projection.attr('Начало смены', { index: 1 }),
    shiftEnd: Projection.attr('Конец смены', { index: 2 })
  });
  modelClass.defineProjection('TeamL', 'i-i-s-gorvodokanal-team', {
    index: Projection.attr('Номер бригады', { index: 0 }),
    shiftStart: Projection.attr('Начало смены', { index: 1 }),
    shiftEnd: Projection.attr('Конец смены', { index: 2 })
  });
};
