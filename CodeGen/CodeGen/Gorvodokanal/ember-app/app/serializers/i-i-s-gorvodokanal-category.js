import { Serializer as CategorySerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-category';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(CategorySerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
