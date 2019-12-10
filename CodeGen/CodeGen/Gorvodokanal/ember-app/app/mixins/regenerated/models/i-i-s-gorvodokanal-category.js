import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number', { defaultValue: 1 }),
  name: DS.attr('string'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      code: { presence: true }
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
  modelClass.defineProjection('CategoryE', 'i-i-s-gorvodokanal-category', {
    code: Projection.attr('Код', { index: 0, hidden: true }),
    name: Projection.attr('Наименование', { index: 1 })
  });
  modelClass.defineProjection('CategoryL', 'i-i-s-gorvodokanal-category', {
    code: Projection.attr('Код', { index: 0 }),
    name: Projection.attr('Наименование', { index: 1 })
  });
};
