import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {SC_WIDTH} from '../../constants/index';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    width: SC_WIDTH * 0.8,
    height: 50,
    backgroundColor: colors.green_background,
    borderRadius: verticalScale(27.5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
