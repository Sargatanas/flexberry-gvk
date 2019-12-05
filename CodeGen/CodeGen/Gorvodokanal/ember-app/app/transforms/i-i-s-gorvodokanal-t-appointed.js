import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tAppointedEnum from '../enums/i-i-s-gorvodokanal-t-appointed';

export default FlexberryEnum.extend({
  enum: tAppointedEnum,
  sourceType: 'IIS.Gorvodokanal.tAppointed'
});
