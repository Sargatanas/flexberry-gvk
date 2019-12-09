import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  shiftStartHour: DS.attr('number', { defaultValue: 8 }),
  shiftStartMinutes: DS.attr('number', { defaultValue: 0 }),
  shiftEndHour: DS.attr('number', { defaultValue: 16 }),
  shiftEndMinutes: DS.attr('number', { defaultValue: 0 }),
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
    shiftStartHour: Projection.attr('Часы', { index: 1 }),
    shiftStartMinutes: Projection.attr('Минуты', { index: 2 }),
    shiftEndHour: Projection.attr('Часы', { index: 3 }),
    shiftEndMinutes: Projection.attr('Минуты', { index: 4 })
  });
  modelClass.defineProjection('TeamL', 'i-i-s-gorvodokanal-team', {
    index: Projection.attr('Номер бригады', { index: 0 }),
    shiftStartHour: Projection.attr('Часы', { index: 1 }),
    shiftStartMinutes: Projection.attr('Минуты', { index: 2 }),
    shiftEndHour: Projection.attr('Часы', { index: 3 }),
    shiftEndMinutes: Projection.attr('Минуты', { index: 4 })
  });
};
