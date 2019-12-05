import { Model as TaskMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-task';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, TaskMixin, {

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
