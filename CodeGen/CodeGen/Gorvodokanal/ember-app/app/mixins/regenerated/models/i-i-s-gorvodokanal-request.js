import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  isAppointed: DS.attr('i-i-s-gorvodokanal-t-appointed'),
  date: DS.attr('date'),
  startHour: DS.attr('number'),
  startMinutes: DS.attr('number'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  endHour: DS.attr('number'),
  endMinutes: DS.attr('number'),
  team: DS.belongsTo('i-i-s-gorvodokanal-team', { inverse: null, async: false }),
  address: DS.belongsTo('i-i-s-gorvodokanal-address', { inverse: null, async: false }),
  tasks: DS.hasMany('i-i-s-gorvodokanal-task-list', { inverse: 'request', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
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
    isAppointed: Projection.attr('Отметка о назначении', { index: 1 }),
    date: Projection.attr('Дата выполнения работ', { index: 3 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 4 }),
    startHour: Projection.attr('Часы', { index: 5 }),
    startMinutes: Projection.attr('Минуты', { index: 6 }),
    endHour: Projection.attr('Часы', { index: 7 }),
    endMinutes: Projection.attr('Минуты', { index: 8 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {

    }, { index: 0 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Бригада', {

    }, { index: 2 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task-list', '', {
      task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {

      }, { index: 0, displayMemberPath: 'content' })
    })
  });
  modelClass.defineProjection('RequestL', 'i-i-s-gorvodokanal-request', {
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Улица', {
      street: Projection.attr('Улица', { index: 0 }),
      house: Projection.attr('Дом', { index: 1 }),
      build: Projection.attr('Корпус', { index: 2 }),
      floor: Projection.attr('Этаж', { index: 3 }),
      apartment: Projection.attr('Квартира', { index: 4 })
    }, { index: -1, hidden: true }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 5 }),
    date: Projection.attr('Дата выполнения работ', { index: 6 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 7 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Выполняющая бригада', {
      index: Projection.attr('Выполняющая бригада', { index: 8 })
    }, { index: -1, hidden: true }),
    startHour: Projection.attr('Часы', { index: 9 }),
    startMinutes: Projection.attr('Минуты', { index: 10 }),
    endHour: Projection.attr('Часы', { index: 11 }),
    endMinutes: Projection.attr('Минуты', { index: 12 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task-list', '', {
      task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {

      }, { index: 0, displayMemberPath: 'content' })
    })
  });
};
