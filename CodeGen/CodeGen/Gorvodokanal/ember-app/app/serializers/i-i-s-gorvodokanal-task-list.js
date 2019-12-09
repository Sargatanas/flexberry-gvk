import { Serializer as TaskListSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-task-list';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(TaskListSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
