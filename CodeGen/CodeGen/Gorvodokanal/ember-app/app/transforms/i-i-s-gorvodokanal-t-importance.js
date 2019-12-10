import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tImportanceEnum from '../enums/i-i-s-gorvodokanal-t-importance';

export default FlexberryEnum.extend({
  enum: tImportanceEnum,
  sourceType: 'IIS.Gorvodokanal.tImportance'
});
