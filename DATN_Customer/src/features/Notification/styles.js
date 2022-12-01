import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  header: {
    height: verticalScale(106),
  },
  trash: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNotifi: {
    height: verticalScale(70),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white_background,
    borderBottomColor: colors.gray,
    borderBottomWidth: verticalScale(0.4),
    alignItems: 'center',
    paddingHorizontal: scale(17),
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: scale(20),
    flex: 5,
  },
  textTitle: {marginBottom: verticalScale(5)},
  textContent: {marginTop: verticalScale(5)},
  icon: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
