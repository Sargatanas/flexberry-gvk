import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  category: DS.belongsTo('i-i-s-gorvodokanal-category', { inverse: null, async: false }),
  team: DS.belongsTo('i-i-s-gorvodokanal-team', { inverse: 'categories', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      category: { presence: true },
      team: { presence: true }
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
  modelClass.defineProjection('CategoryListE', 'i-i-s-gorvodokanal-category-list', {
    category: Projection.belongsTo('i-i-s-gorvodokanal-category', 'Категория', {

    }, { index: 0, displayMemberPath: 'name' })
  });
};
