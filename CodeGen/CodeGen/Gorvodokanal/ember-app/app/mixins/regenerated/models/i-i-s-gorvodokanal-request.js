import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number'),
  isAppointed: DS.attr('i-i-s-gorvodokanal-t-appointed'),
  date: DS.attr('date'),
  isCompleted: DS.attr('boolean'),
  realDuration: DS.attr('date'),
  team: DS.belongsTo('i-i-s-gorvodokanal-team', { inverse: null, async: false }),
  address: DS.belongsTo('i-i-s-gorvodokanal-address', { inverse: null, async: false }),
  tasks: DS.hasMany('i-i-s-gorvodokanal-task', { inverse: 'request', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      index: { presence: true },
      isAppointed: { presence: true },
      isCompleted: { presence: true },
      address: { presence: true }
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
  modelClass.defineProjection('RequestE', 'i-i-s-gorvodokanal-request', {
    index: Projection.attr('Номер заявки', { index: 0 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {
      street: Projection.attr('Улица', { index: 2 }),
      house: Projection.attr('Дом', { index: 3 }),
      build: Projection.attr('Корпус', { index: 4 }),
      floor: Projection.attr('Этаж', { index: 5 }),
      flat: Projection.attr('Квартира', { index: 6 })
    }, { index: 1 }),
    isCompleted: Projection.attr('Отметка о закреплении', { index: 7 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Бригада', {
      index: Projection.attr('Номер бригады', { index: 9 })
    }, { index: 8 }),
    isAppointed: Projection.attr('Отметка о выполнении', { index: 10 }),
    realDuration: Projection.attr('Фактическая длительность работ', { index: 11 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task', 'Задачи', {
      code: Projection.attr('Code', { index: 0 }),
      content: Projection.attr('Content', { index: 1 }),
      planeDuration: Projection.attr('Plane duration', { index: 2 })
    })
  });
  modelClass.defineProjection('RequestL', 'i-i-s-gorvodokanal-request', {
    index: Projection.attr('Номер заявки', { index: 0 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Улица', {
      street: Projection.attr('Улица', { index: 1 }),
      house: Projection.attr('Дом', { index: 2 }),
      build: Projection.attr('Корпус', { index: 3 }),
      floor: Projection.attr('Этаж', { index: 4 }),
      flat: Projection.attr('Квартира', { index: 5 })
    }, { index: -1, hidden: true }),
    isAppointed: Projection.attr('Отметка о прикреплении', { index: 6 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Номер выполняющей бригады', {
      index: Projection.attr('Номер выполняющей бригады', { index: 7 })
    }, { index: -1, hidden: true }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 8 }),
    realDuration: Projection.attr('Фактическая длительность работ', { index: 9 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task', 'Задачи', {
      code: Projection.attr('Code', { index: 0 }),
      content: Projection.attr('Content', { index: 1 }),
      planeDuration: Projection.attr('Plane duration', { index: 2 })
    })
  });
};
