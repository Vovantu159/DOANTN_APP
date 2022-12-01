import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {scWidth, scHeight} from '../../constants/styles';
export const styles = StyleSheet.create({
  container: {
    width: scWidth * 0.8,
    height: 50,
    backgroundColor: colors.green_background,
    borderRadius: verticalScale(27.5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
