import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  content: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  topItem: {
    minHeight: verticalScale(90),
    width: '100%',
    marginTop: verticalScale(20),
    marginBottom: 50,
    backgroundColor: colors.white_background,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: 'center',
  },
  txt1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  txt2: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  bodyItem: {
    minHeight: verticalScale(60),
    width: '100%',
    backgroundColor: colors.white_background,
    flexDirection: 'row',
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  icon: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: 10,
    marginLeft: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  avt: {width: 60, height: 60, borderRadius: 9999, marginLeft: 10},
});
