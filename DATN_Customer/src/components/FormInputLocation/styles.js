import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    backgroundColor: colors.white_background,
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(10),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    minHeight: verticalScale(30),
    flex: 1,
    marginLeft: scale(15),
    fontWeight: '500',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: verticalScale(1),
    width: '90%',
    backgroundColor: colors.gray,
    marginLeft: scale(20),
  },
  dash: {
    flexDirection: 'column',
    height: verticalScale(20),
    marginLeft: verticalScale(6),
  },
  baseTitle: {
    marginLeft: verticalScale(25),
    color: colors.gray,
    fontWeight: '600',
  },
  item: {
    height: verticalScale(40),
    backgroundColor: colors.white_background,
    borderRadius: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    marginHorizontal: scale(10),
    marginBottom: verticalScale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemList: {
    height: verticalScale(50),
    borderBottomColor: colors.gray_color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    // backgroundColor: 'red',
  },
  right: {
    flex: 8,
    alignItems: 'center',
  },
});
