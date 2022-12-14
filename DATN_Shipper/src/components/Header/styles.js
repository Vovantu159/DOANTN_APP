import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(52, 52, 52, 0.06)',
    marginTop: Platform.OS === 'android' ? 10 : 40,
    backgroundColor: '#ffffff',
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentCenter: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  contentRightSecond: {
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fontSizeContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
