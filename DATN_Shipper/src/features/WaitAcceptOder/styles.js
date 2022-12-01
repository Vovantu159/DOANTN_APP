import {StyleSheet, Dimensions} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
const Sc_Width = Dimensions.get('window').width;
const Sc_Height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  content: {
    flex: 1,
  },
  item: {
    minHeight: verticalScale(80),
    backgroundColor: '#FFFFFFFF',
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  iconItem: {
    height: 50,
    width: 50,
    borderRadius: 999999,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleItem: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentItem: {
    fontSize: 12,
    marginVertical: 10,
  },
  modal: {
    width: Sc_Width * 0.95,
    minHeight: Sc_Height * 0.45,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
  },
  info: {
    flex: 1.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
  },
  location: {
    flex: 3,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#F7F7F7',
    borderTopWidth: 1,
    marginTop: 10,
  },
  avt: {
    height: 44,
    width: 44,
    alignSelf: 'center',
    borderRadius: 5,
  },
  txt1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btn1: {
    height: 22,
    width: 60,
    backgroundColor: '#FDBB2F',
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 12,
  },
  txt3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green_background,
  },
  txt4: {
    color: '#D8D8D8',
  },
  dash: {
    paddingLeft: 16,
  },
  txt5: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '800',
    color: '#CFD8DC',
  },
  txt6: {
    marginTop: 5,
  },
  btn2: {
    width: '40%',
    backgroundColor: '#F44336',
    marginHorizontal: '5%',
    height: 40,
  },
  btn3: {
    width: '40%',
    backgroundColor: colors.green_background,
    marginHorizontal: '5%',
    height: 40,
  },
  btn4: {
    width: '40%',
    backgroundColor: '#90CAF9',
    marginHorizontal: '5%',
    alignSelf: 'center',
    height: 40,
  },
  base1: {
    flexDirection: 'row',
    paddingLeft: 10,
    height: 50,
    alignItems: 'center',
  },
});
