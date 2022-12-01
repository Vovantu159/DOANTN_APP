import {Dimensions, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
const SC_HEIGHT = Dimensions.get('screen').height;
const SC_WIDTH = Dimensions.get('screen').width;
const ASPECT_RATIO = SC_WIDTH / SC_HEIGHT;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export {STATUSBAR_HEIGHT, SC_HEIGHT, SC_WIDTH, LATITUDE_DELTA, LONGITUDE_DELTA};
