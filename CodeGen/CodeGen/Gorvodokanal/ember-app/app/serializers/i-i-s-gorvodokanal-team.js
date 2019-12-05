import { Serializer as TeamSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-team';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(TeamSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
