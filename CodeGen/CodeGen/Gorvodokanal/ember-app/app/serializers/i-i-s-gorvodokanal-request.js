import { Serializer as RequestSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-request';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(RequestSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
