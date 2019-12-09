import { Model as RequestMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-request';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, RequestMixin, {
  index: DS.attr('number', { defaultValue: 1 }),
});

defineNamespace(Model);
defineProjections(Model);
export default Model;
