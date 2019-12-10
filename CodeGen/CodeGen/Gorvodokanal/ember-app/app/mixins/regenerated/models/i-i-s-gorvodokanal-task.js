import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 1 }),
  content: DS.attr('string'),
  planeDuration: DS.attr('date'),
  importance: DS.attr('i-i-s-gorvodokanal-t-importance'),
  category: DS.belongsTo('i-i-s-gorvodokanal-category', { inverse: null, async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      index: { presence: true },
      content: { presence: true },
      category: { presence: true }
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
    index: Projection.attr('', { index: 0, hidden: true }),
    content: Projection.attr('Детали', { index: 2 }),
    planeDuration: Projection.attr('Примерная длительность работ', { index: 3 }),
    importance: Projection.attr('Срочность', { index: 4 }),
    category: Projection.belongsTo('i-i-s-gorvodokanal-category', 'Категория', {

    }, { index: 1 })
  });
  modelClass.defineProjection('TaskL', 'i-i-s-gorvodokanal-task', {
    category: Projection.belongsTo('i-i-s-gorvodokanal-category', 'Категория', {
      name: Projection.attr('Категория', { index: 0 })
    }, { index: -1, hidden: true }),
    content: Projection.attr('Детали', { index: 1 }),
    planeDuration: Projection.attr('Примерная длительность работ', { index: 2 }),
    importance: Projection.attr('Срочнось', { index: 3 })
  });
};
