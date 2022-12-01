import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    height: 300,
    justifyContent: 'flex-end',
  },
  topContent: {
    flex: 1,
    marginBottom: 20,
  },
  footerContent: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonPick: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
