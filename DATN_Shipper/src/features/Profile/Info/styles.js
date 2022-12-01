import {colors} from '../../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
import {StyleSheet, Dimensions} from 'react-native';
const avtWidth = Dimensions.get('window').width / 2.5;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  header: {borderBottomColor: '#ffffff'},
  txt1: {color: '#FFB74D', fontSize: 16},
  content: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  avt: {
    alignSelf: 'center',
    width: avtWidth,
    height: avtWidth,
    borderRadius: 999999,
  },
  txt2: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  txt3: {
    marginLeft: 5,
    color: '#263238',
  },
  star: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'center',
  },
  txt4: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 20,
    color: '#9E9E9E',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    height: verticalScale(45),
    backgroundColor: colors.white_background,
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  txt5: {
    fontSize: 16,
  },
  txt6: {
    color: '#9E9E9E',
  },
});
