import { Serializer as AddressSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-address';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(AddressSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
