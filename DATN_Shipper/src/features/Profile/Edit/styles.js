import {colors} from '../../../theme/colors';
import {verticalScale} from 'react-native-size-matters';
import {StyleSheet, Dimensions} from 'react-native';

const avtWidth = Dimensions.get('window').width / 4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  header: {
    borderBottomColor: colors.white_background,
  },
  top: {flexDirection: 'row', marginBottom: 40},
  txt1: {color: '#FFB74D', fontSize: 16},
  txt2: {color: colors.green_background, fontSize: 16},
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
  avt: {
    alignSelf: 'center',
    width: avtWidth,
    height: avtWidth,
    borderRadius: 999999,
  },
  txtInput: {
    height: verticalScale(40),
    width: '80%',
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 1,
  },
  cameraIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: avtWidth / 4,
  },
  txtEdit: {marginTop: 10, alignSelf: 'center', color: '#FFB74D'},
  input: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  content: {flex: 1, backgroundColor: '#F7F8FA'},
  line: {
    width: '100%',
    height: 50,
    backgroundColor: '#F7F8FA',
  },
});
