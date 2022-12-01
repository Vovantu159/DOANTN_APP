import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
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
});
