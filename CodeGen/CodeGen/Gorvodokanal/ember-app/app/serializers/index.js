import { Serializer as TaskSerializer } from
'../mixins/regenerated/serializers/i-i-s-gorvodokanal-task';
import { Serializer as RequestSerializer } from
'../mixins/regenerated/serializers/i-i-s-gorvodokanal-request';
import { Serializer as AddressSerializer } from
'../mixins/regenerated/serializers/i-i-s-gorvodokanal-address';
import { Serializer as TeamSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-team';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(TaskSerializer, RequestSerializer, AddressSerializer, TeamSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
