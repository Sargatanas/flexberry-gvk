import { Serializer as TaskSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-task';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(TaskSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
