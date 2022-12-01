import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  datePicker: {
    height: verticalScale(80),
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnTop: {
    height: verticalScale(70),
    width: '45%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  txt1: {
    fontSize: 16,
    color: '#D8D8D8',
  },
  txt2: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white_background,
  },
  item: {
    width: '90%',
    minHeight: verticalScale(150),
    marginVertical: 10,
    backgroundColor: colors.white_background,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtItem: {
    marginLeft: 10,
    marginRight: 5,
  },
  dash: {
    paddingLeft: 6,
  },
  txtDate: {
    marginBottom: 20,
  },
  footerItem: {
    borderTopColor: '#D8D8D8',
    flexDirection: 'row',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 15,
    marginBottom: 10,
  },
});
