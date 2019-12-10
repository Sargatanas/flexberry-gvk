import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tDistrictsEnum from '../enums/i-i-s-gorvodokanal-t-districts';

export default FlexberryEnum.extend({
  enum: tDistrictsEnum,
  sourceType: 'IIS.Gorvodokanal.tDistricts'
});
