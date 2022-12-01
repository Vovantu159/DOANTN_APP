import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  content: {
    width: '90%',
    height: '40%',
    marginTop: -50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: colors.white_background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  btn: {
    width: '70%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green_background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txt1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242A37',
  },
  txt2: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
  txt3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242A37',
  },
  txt4: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  base: {flex: 1, justifyContent: 'center', alignItems: 'flex-end'},
  txt5: {color: colors.white_background, fontWeight: 'bold'},
});
