import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  item: {
    minHeight: verticalScale(150),
    width: '95%',
    backgroundColor: colors.white_background,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  avt: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: 999999,
  },
  line2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
  },
  leftLine2: {
    marginLeft: 20,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  txtNumberStar: {
    color: '#FDBB2F',
  },
  line3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  dash: {
    height: 10,
    width: 1,
    flexDirection: 'column',
    marginLeft: 26,
    marginVertical: 3,
  },
  txtLocation: {
    marginLeft: 10,
    fontSize: 14,
  },
});
