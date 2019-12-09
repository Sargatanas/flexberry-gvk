import { Model as AddressMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-address';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, AddressMixin, {
  fullAddress: Ember.computed('street', 'house', 'build', 'floor', 'apartment', function() {
    let adress = 'Ул. ';
    adress += this.get('street') + ', д.';
    adress += this.get('house');

    let building = this.get('building');
    adress += building ? ', корп.' + building : '';

    let floor = this.get('floor');
    adress += floor ? ', эт.' + floor : '';

    let apartment = this.get('apartment');
    adress += apartment ? ', кв.' + apartment : '';

    return adress;
  }),

});

defineNamespace(Model);
defineProjections(Model);
export default Model;
