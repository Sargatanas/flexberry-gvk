import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';

export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1000 }),
  isAppointed: DS.attr('i-i-s-gorvodokanal-t-appointed'),
  dateStart: DS.attr('date'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  dateEnd: DS.attr('date'),
  planeDateStart: DS.attr('date'),
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
    index: Projection.attr('', { index: 0}),
    planeDateStart: Projection.attr('', { index: 1, hidden: true }),
    isAppointed: Projection.attr('Отметка о назначении', { index: 3 }),
    dateStart: Projection.attr('Дата выполнения работ', { index: 5 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 6 }),
    dateEnd: Projection.attr('Фактическое время окончания работ', { index: 7 }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {

    }, { index: 2 }),
    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Бригада', {

    }, { index: 4 }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task-list', '', {
      task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {

      }, { index: 0, displayMemberPath: 'content' })
    })
  });
  modelClass.defineProjection('RequestL', 'i-i-s-gorvodokanal-request', {
    index: Projection.attr('', { index: 0, hidden: true }),
    address: Projection.belongsTo('i-i-s-gorvodokanal-address', 'Адрес', {
      district: Projection.attr('Район', { index: 0, hidden: true }),
      street: Projection.attr('Улица', { index: 1}),
      house: Projection.attr('Дом', { index: 2}),
      build: Projection.attr('Корпус', { index: 3}),
      porch: Projection.attr('Подъезд', { index: 4}),
      floor: Projection.attr('Этаж', { index: 5}),
      apartment: Projection.attr('Квартира', { index: 6})
    }, { index: -1, hidden: true }),

    isAppointed: Projection.attr('Отметка о назначении', { index: 7 }),

    team: Projection.belongsTo('i-i-s-gorvodokanal-team', 'Выполняющая бригада', {
      index: Projection.attr('Выполняющая бригада', { index: 8 })
    }, { index: -1, hidden: true }),

    dateStart: Projection.attr('Дата выполнения работ', { index: 9 }),
    isCompleted: Projection.attr('Отметка о выполнении', { index: 10 }),
    dateEnd: Projection.attr('Фактическое время окончания работ', { index: 11 }),
    index: Projection.attr('', { index: 12, hidden: true }),
    planeDateStart: Projection.attr('', { index: 13, hidden: true }),
    tasks: Projection.hasMany('i-i-s-gorvodokanal-task-list', '', {
      task: Projection.belongsTo('i-i-s-gorvodokanal-task', 'Задача', {
        index: Projection.attr('', { index: 0, hidden: true }),
        content: Projection.attr('Детали', { index: 2 }),
        planeDuration: Projection.attr('Примерная длительность работ', { index: 3 }),
        importance: Projection.attr('Срочность', { index: 4 }),
        category: Projection.belongsTo('i-i-s-gorvodokanal-category', 'Категория', {

        }, { index: 1 })
      }, { index: 0, displayMemberPath: 'content' })
    })
  });
};
