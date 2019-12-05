import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  iindex: DS.attr('number'),
  isAppointed: DS.attr('i-i-s-gorvodokanal-t-appointed'),
  date: DS.attr('date'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  realDuration: DS.attr('date'),
  team: DS.belongsTo('i-i-s-gorvodokanal-team', { inverse: null, async: false }),
  address: DS.belongsTo('i-i-s-gorvodokanal-address', { inverse: null, async: false }),
  tasks: DS.hasMany('i-i-s-gorvodokanal-task', { inverse: 'request', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      iindex: { presence: true },
      isAppointed: { presence: true },
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
    iindex: Projection.attr('Номер заявки', { index: 0 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {
      street: Projection.attr('Улица', { index: 2 }),
      house: Projection.attr('Дом', { index: 3 }),
      build: Projection.attr('Корпус', { index: 4 }),
      floor: Projection.attr('Этаж', { index: 5 }),
      apartment: Projection.attr('Квартира', { index: 6 })
    }, { index: 1 }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 7 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Бригада', {
      index: Projection.attr('Номер бригады', { index: 9 })
    }, { index: 8 }),
    date: Projection.attr('Дата выполнения работ', { index: 10 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 11 }),
    realDuration: Projection.attr('Фактическая длительность работ', { index: 12 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task', 'Задачи', {
      code: Projection.attr('Код задачи', { index: 0 }),
      content: Projection.attr('Детали задачи', { index: 1 }),
      planeDuration: Projection.attr('Примерная длительность работ', { index: 2 })
    })
  });
  modelClass.defineProjection('RequestL', 'i-i-s-gorvodokanal-request', {
    iindex: Projection.attr('Номер заявки', { index: 0 }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 1 }),
    date: Projection.attr('Дата выполнения работ', { index: 2 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 3 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Выполняющая бригада', {
      index: Projection.attr('Выполняющая бригада', { index: 4 })
    }, { index: -1, hidden: true }),
    realDuration: Projection.attr('Фактическая длительность работ', { index: 5 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Улица', {
      street: Projection.attr('Улица', { index: 6 }),
      house: Projection.attr('Дом', { index: 7 }),
      build: Projection.attr('Корпус', { index: 8 }),
      floor: Projection.attr('Этаж', { index: 9 }),
      apartment: Projection.attr('Квартира', { index: 10 })
    }, { index: -1, hidden: true }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task', '', {
      code: Projection.attr('Код задачи', { index: 0 }),
      content: Projection.attr('Детали задачи', { index: 1 }),
      planeDuration: Projection.attr('Примерная длительность работ', { index: 2 })
    })
  });
};
