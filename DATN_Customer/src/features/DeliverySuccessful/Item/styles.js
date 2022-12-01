import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  item: {
    minHeight: verticalScale(150),
    width: '95%',
    backgroundColor: colors.white_background,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dash: {
    height: 30,
    width: 1,
    flexDirection: 'column',
    marginLeft: 11,
    marginVertical: 3,
  },
  price: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  txtDate: {
    marginBottom: verticalScale(15),
  },
  txtLocation: {
    marginLeft: 10,
    fontSize: 16,
  },
  txtTotalPrice: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
