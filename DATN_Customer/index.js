import React from 'react';
import {AppRegistry, Vibration} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {store} from './src/redux/store/store';
import {upDateLink} from './src/redux/reducers/handeNotifiSlice';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  Vibration.vibrate(1000, true);
  console.log('Message handled in the background!', remoteMessage);
  store.dispatch(
    upDateLink({
      link: remoteMessage?.data?.link,
      data: {
        key: remoteMessage?.data?.key,
        oderId: remoteMessage?.data?.oderId,
      },
    }),
  );
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
