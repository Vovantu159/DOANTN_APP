import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    minHeight: verticalScale(104),
    width: scale(315),
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  topItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.3,
  },
  bottomItem: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
  bottomItem1: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(50),
  },
  txtCode: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
  },
  inputCode: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});
