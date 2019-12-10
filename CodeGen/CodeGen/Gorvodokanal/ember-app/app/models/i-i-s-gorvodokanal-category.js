import { Model as CategoryMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-category';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, CategoryMixin, {

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
