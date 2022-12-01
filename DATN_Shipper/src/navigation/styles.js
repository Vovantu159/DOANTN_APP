import {StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import {STATUSBAR_HEIGHT} from '../constants';
import {colors} from '../theme/colors';
export const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'red',
  },
  imageHeader: {
    height: verticalScale(201),
    width: '100%',
    marginTop: -STATUSBAR_HEIGHT - 10,
    flexDirection: 'row',
  },
  viewImg: {
    height: verticalScale(70),
    width: verticalScale(70),
    borderRadius: verticalScale(35),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: verticalScale(64),
    width: verticalScale(64),
    borderRadius: verticalScale(32),
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white_background,
    marginBottom: 5,
  },
  goldImg: {
    width: scale(133),
    height: verticalScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: -10,
    marginBottom: 5,
  },
  money: {
    fontSize: 16,
    color: colors.white_background,
    fontWeight: '600',
  },
  leftView: {flex: 1, justifyContent: 'center', paddingLeft: 10},
  txtGold: {color: '#FDD835', fontSize: 12, marginLeft: 3},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'flex-start',
  },
  label: {fontSize: 18, marginLeft: 5},
});
