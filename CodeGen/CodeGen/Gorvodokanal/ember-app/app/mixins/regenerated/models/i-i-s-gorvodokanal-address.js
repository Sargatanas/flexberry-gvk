import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  district: DS.attr('i-i-s-gorvodokanal-t-districts'),
  street: DS.attr('string'),
  house: DS.attr('number'),
  build: DS.attr('string'),
  porch: DS.attr('number'),
  floor: DS.attr('number'),
  apartment: DS.attr('number'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      district: { presence: true },
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
    district: Projection.attr('Район', { index: 0 }),
    street: Projection.attr('Улица', { index: 1 }),
    house: Projection.attr('Дом', { index: 2 }),
    build: Projection.attr('Корпус', { index: 3 }),
    porch: Projection.attr('Подъезд', { index: 4 }),
    floor: Projection.attr('Этаж', { index: 5 }),
    apartment: Projection.attr('Квартира', { index: 6 })
  });
  modelClass.defineProjection('AddressL', 'i-i-s-gorvodokanal-address', {
    district: Projection.attr('Район', { index: 0 }),
    street: Projection.attr('Улица', { index: 1 }),
    house: Projection.attr('Дом', { index: 2 }),
    build: Projection.attr('Корпус', { index: 3 }),
    porch: Projection.attr('Подъезд', { index: 4 }),
    floor: Projection.attr('Этаж', { index: 5 }),
    apartment: Projection.attr('Квартира', { index: 6 })
  });
};
