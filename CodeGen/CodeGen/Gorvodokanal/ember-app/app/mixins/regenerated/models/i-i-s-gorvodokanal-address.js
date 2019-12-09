import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  street: DS.attr('string'),
  house: DS.attr('number'),
  build: DS.attr('string'),
  floor: DS.attr('number'),
  apartment: DS.attr('number'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      index: { presence: true },
      street: { presence: true },
      house: { presence: true }
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
  modelClass.defineProjection('AddressE', 'i-i-s-gorvodokanal-address', {
    index: Projection.attr('Код адреса', { index: 0 }),
    street: Projection.attr('Улица', { index: 1 }),
    house: Projection.attr('Дом', { index: 2 }),
    build: Projection.attr('Корпус', { index: 3 }),
    floor: Projection.attr('Этаж', { index: 4 }),
    apartment: Projection.attr('Квартира', { index: 5 })
  });
  modelClass.defineProjection('AddressL', 'i-i-s-gorvodokanal-address', {
    index: Projection.attr('Код адреса', { index: 0 }),
    street: Projection.attr('Улица', { index: 1 }),
    house: Projection.attr('Дом', { index: 2 }),
    build: Projection.attr('Корпус', { index: 3 }),
    floor: Projection.attr('Этаж', { index: 4 }),
    apartment: Projection.attr('Квартира', { index: 5 })
  });
};
