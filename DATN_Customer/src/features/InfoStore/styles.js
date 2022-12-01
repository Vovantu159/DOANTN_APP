import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: '95%',
    marginTop: 20,
  },
  inputLocation: {
    marginTop: 20,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: 'transparent',
  },
  label: {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 20,
  },
  txtLocation: {
    marginLeft: 15,
    fontSize: 16,
    marginTop: 15,
    flexShrink: 1,
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 999999,
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
});
