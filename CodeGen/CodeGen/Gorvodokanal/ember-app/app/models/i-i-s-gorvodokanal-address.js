import { Model as AddressMixin, defineNamespace, defineProjections } from
  '../mixins/regenerated/models/i-i-s-gorvodokanal-address';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, AddressMixin, {
  fullAddress: Ember.computed('street', 'house', 'building', 'porch', 'floor', 'apartment', function() {
    let fullAddress = 'Ул. ';

    fullAddress += this.get('street') + ', ';
    fullAddress += 'д. ' + this.get('house');

    let building = this.get('building');
    fullAddress += building ? ', корп. ' + building : '';

    let porch = this.get('porch');
    fullAddress += porch ? ', под. ' + porch : '';

    let floor = this.get('floor');
    fullAddress += floor ? ', эт. ' + floor : '';

    let apartment = this.get('apartment');
    fullAddress += apartment ? ', кв. ' + apartment : '';

    return fullAddress;
  }),
});

defineNamespace(Model);
defineProjections(Model);
export default Model;
