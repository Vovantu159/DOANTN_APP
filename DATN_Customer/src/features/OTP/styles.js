import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {SC_WIDTH} from '../../constants/SizeScreen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  backIcon: {
    marginTop: verticalScale(21),
    marginLeft: scale(20),
  },
  logo: {
    marginTop: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: scale(25),
    marginTop: verticalScale(85),
  },
  content: {
    marginLeft: scale(25),
    marginTop: verticalScale(3),
    marginRight: scale(62),
  },
  inPutOTP: {
    marginTop: verticalScale(41),
    flexDirection: 'row',
    marginHorizontal: scale(21),
    justifyContent: 'space-between',
  },
  textInput: {
    width: (SC_WIDTH - 45) / 8,
    height: verticalScale(70),
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  btn: {
    marginTop: verticalScale(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
