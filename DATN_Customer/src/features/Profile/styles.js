import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: -verticalScale(50),
  },
  info: {
    alignSelf: 'center',
    marginTop: verticalScale(15),
    alignItems: 'center',
  },
  ranking: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  textNumber: {
    color: colors.gray,
  },
  textRanking: {
    marginLeft: scale(5),
    marginRight: scale(15),
    color: colors.gray,
  },
  itemMenu: {
    width: '100%',
    height: verticalScale(55),
    backgroundColor: colors.white_background,
    paddingLeft: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: verticalScale(15),
    borderBottomColor: colors.gray_color,
    borderBottomWidth: verticalScale(0.6),
  },
});
