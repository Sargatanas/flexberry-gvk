import { Model as CategoryListMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-category-list';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, CategoryListMixin, {

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
