import {StyleSheet} from 'react-native';
import {SC_WIDTH} from '../../constants/SizeScreen';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  txtCancel: {
    fontSize: 18,
    color: '#FFB74D',
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
    marginVertical: 15,
  },
  txtInfoProduct: {
    marginHorizontal: 20,
  },
  txtPrice: {
    marginLeft: 15,
    color: colors.redColor,
  },
  txtNote: {
    borderColor: colors.greenOpacity,
    minHeight: 100,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputCount: {
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnAddItem: {
    marginRight: 20,
    width: 30,
    height: 30,
    borderRadius: 99999,
    backgroundColor: colors.greenOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txtLine1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginHorizontal: 5,
  },
  btnCreate: {
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  inputPrice: {
    borderColor: colors.greenOpacity,
    minHeight: 50,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 40,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },

  textInput: {
    marginTop: 18,
    flexDirection: 'row',
  },
  btn: {
    alignSelf: 'center',
    width: SC_WIDTH * 0.7,
    marginTop: 20,
  },
  error: {
    marginLeft: 10,
    color: colors.redColor,
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: colors.green_background,
  },
});
