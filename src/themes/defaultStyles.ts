import {StyleSheet} from 'react-native';
import {COLORS} from './color';

export const DEFAULT_STYLES = StyleSheet.create({
  row: {flexDirection: 'row'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  wrap: {flexWrap: 'wrap'},
  absoluteFillObject: StyleSheet.absoluteFillObject,
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
  },
  shadowGrey: {
    shadowColor: 'grey',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
