import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  isAppointed: DS.attr('i-i-s-gorvodokanal-t-appointed'),
  dateStart: DS.attr('date'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  dateEnd: DS.attr('date'),
  address: DS.belongsTo('i-i-s-gorvodokanal-address', { inverse: null, async: false }),
  team: DS.belongsTo('i-i-s-gorvodokanal-team', { inverse: null, async: false }),
  tasks: DS.hasMany('i-i-s-gorvodokanal-task-list', { inverse: 'request', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      index: { presence: true },
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
    index: Projection.attr('', { index: 0, hidden: true }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 2 }),
    dateStart: Projection.attr('Дата выполнения работ', { index: 4 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 5 }),
    dateEnd: Projection.attr('Фактическое время окончания работ', { index: 6 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {

    }, { index: 1 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Бригада', {

    }, { index: 3 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task-list', '', {
      task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {

      }, { index: 0, displayMemberPath: 'content' })
    })
  });
  modelClass.defineProjection('RequestL', 'i-i-s-gorvodokanal-request', {
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {
      district: Projection.attr('Адрес', { index: 0 })
    }, { index: -1, hidden: true }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 1 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Выполняющая бригада', {
      index: Projection.attr('Выполняющая бригада', { index: 2 })
    }, { index: -1, hidden: true }),
    dateStart: Projection.attr('Дата выполнения работ', { index: 3 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 4 }),
    dateEnd: Projection.attr('Фактическое время окончания работ', { index: 5 })
  });
};
