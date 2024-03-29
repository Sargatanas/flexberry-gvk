import { Model as TeamMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-team';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, TeamMixin, {

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
