import {Dimensions, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
const SC_HEIGHT = Dimensions.get('screen').height;
const SC_WIDTH = Dimensions.get('screen').width;
export {STATUSBAR_HEIGHT, SC_HEIGHT, SC_WIDTH};
