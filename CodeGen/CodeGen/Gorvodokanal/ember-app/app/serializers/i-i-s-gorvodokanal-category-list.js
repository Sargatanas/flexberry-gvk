import { Serializer as CategoryListSerializer } from
  '../mixins/regenerated/serializers/i-i-s-gorvodokanal-category-list';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(CategoryListSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
