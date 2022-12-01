import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 20,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    flexDirection: 'row',
  },
  swiper: {height: 200, width: '100%', marginTop: 20},
  slide: {
    alignItems: 'center',
  },
  socialOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    marginBottom: 52,
  },
  txtInput: {width: 331, height: 50},
  btnSocial: {
    paddingHorizontal: 8,
    backgroundColor: colors.white_background,
    height: 32,
    width: 122,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
  },
  textOption: {
    marginTop: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    marginTop: 20,
    width: 331,
    marginHorizontal: 20,
    backgroundColor: colors.green_background,
  },
  txtTile: {
    color: colors.green_background,
  },
  baseLeft: {marginLeft: 10},
});
