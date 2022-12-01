import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SC_WIDTH} from '../../../constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: verticalScale(20),
    width: '100%',
    height: verticalScale(80),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
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
