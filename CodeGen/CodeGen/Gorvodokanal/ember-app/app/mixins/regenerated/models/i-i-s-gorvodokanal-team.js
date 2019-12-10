import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  index: DS.attr('number', { defaultValue: 100 }),
  shiftStart: DS.attr('date'),
  shiftEnd: DS.attr('date'),
  categories: DS.hasMany('i-i-s-gorvodokanal-category-list', { inverse: 'team', async: false }),
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
    index: Projection.attr('Номер бригады', { index: 0, hidden: true }),
    shiftStart: Projection.attr('Начало смены', { index: 1 }),
    shiftEnd: Projection.attr('Конец смены', { index: 2 }),
    categories: Projection.hasMany('i-i-s-gorvodokanal-category-list', '', {
      category: Projection.belongsTo('i-i-s-gorvodokanal-category', 'Категория', {

      }, { index: 0, displayMemberPath: 'name' })
    })
  });
  modelClass.defineProjection('TeamL', 'i-i-s-gorvodokanal-team', {
    index: Projection.attr('Номер бригады', { index: 0 }),
    shiftStart: Projection.attr('Начало смены', { index: 1 }),
    shiftEnd: Projection.attr('Конец смены', { index: 2 })
  });
};
