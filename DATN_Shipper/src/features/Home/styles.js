import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  btnTest: {
    marginTop: 20,
    height: 50,
    //width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  messageOffline: {
    backgroundColor: colors.green_background,
    width: '100%',
    height: verticalScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  txtMessage: {
    fontSize: 16,
    color: colors.white_background,
    fontWeight: '600',
  },
});
