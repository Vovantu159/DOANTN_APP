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
  },
  line1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
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
  btn2: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.green_background,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txt2: {
    fontSize: 12,
  },
  avt: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 5,
  },
  point: {
    color: '#FDBB2F',
  },
  txtRank: {
    color: '#616161',
  },
  base1: {
    flexDirection: 'row',
    paddingLeft: 30,
    height: 50,
    alignItems: 'center',
  },
  base2: {flexDirection: 'row', alignItems: 'center'},
  dash: {
    paddingLeft: 36,
  },
  dashLine: {width: '95%', height: 1, alignSelf: 'center'},
  txt5: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '800',
    color: '#CFD8DC',
  },
  note: {
    paddingHorizontal: 20,
  },
  txtNote: {
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  txtContentNote: {
    fontStyle: 'italic',
    marginVertical: 2,
    fontSize: 14,
  },
  itemBill: {
    height: 50,
    borderBottomColor: '#CFD8DC',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  price: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  btn3: {
    height: verticalScale(40),
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#35B3E2',
  },
  btn4: {
    height: verticalScale(40),
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#F47E35',
    marginBottom: 50,
  },
  btnTracking: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
