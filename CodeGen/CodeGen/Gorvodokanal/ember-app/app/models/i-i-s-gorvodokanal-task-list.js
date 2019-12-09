import { Model as TaskListMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-task-list';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, TaskListMixin, {

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
