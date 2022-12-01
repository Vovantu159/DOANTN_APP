import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerCustom from './drawernavigation';
import {Auth} from './stacknavigation';
import RoomChat from '../features/Message/RoomChat';
import {navigate, navigationRef} from './navigationService';
import CreateDelivering from '../features/CreateDelivering';
import Statics from '../features/Statics';
import InfoStore from '../features/InfoStore';
import DetailSuccessDelivery from '../features/DetailDeliverySuccess';
import DeliveryDetail from '../features/DetailDelivering';
import ListShipper from '../features/ListShipper';
import Tracking from '../features/Tracking';
import CaptureImage from '../features/InfoStore/Item/CaptureImages';
import Notification from '../features/Notification';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
export default function RootNavigation() {
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const handleNotification = useSelector((state) => state.handleNotifiReducer);
  console.log('check', handleNotification);
  const deepLinking = {
    prefixes: ['https://customer.com', 'customer://'],
    config: {
      Notification: 'NotificationPatch',

      // run ios in terminal : xcrun simctl openurl booted customer://Notification
      // run android teminal : adb shell am start -W -a android.intent.action.VIEW -d "customer://Notification" com.actvn.customer
      // run android teminal : adb shell am start -W -a android.intent.action.VIEW -d "driver://Notification/10" com.actvn.customer
    },
  };
  // useEffect(() => {
  //   console.log('Handle root', handleNotification);
  //   const {data, link} = handleNotification;
  //   if (data?.key === 'AcceptOder') {
  //     navigate('Notification', {item: data});
  //   }
  //   if (data?.key === 'Notification') {
  //     navigate('Notification');
  //   }
  //   return () => {
  //     // dispatch(removeLink());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [handleNotification]);
  return (
    <NavigationContainer ref={navigationRef} linking={deepLinking}>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{headerShown: false}}>
        {token === '' ? (
          <Stack.Screen name="Auth" component={Auth} />
        ) : (
          <Stack.Screen name="Main" component={DrawerCustom} />
        )}
        <Stack.Screen name="CreateDelivering" component={CreateDelivering} />
        <Stack.Screen name="Statics" component={Statics} />
        <Stack.Screen name="InfoStore" component={InfoStore} />
        <Stack.Screen
          name="DetailSuccessDelivery"
          component={DetailSuccessDelivery}
        />
        <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
        <Stack.Screen name="RoomChat" component={RoomChat} />
        <Stack.Screen name="ListShipper" component={ListShipper} />
        <Stack.Screen name="Tracking" component={Tracking} />
        <Stack.Screen name="CaptureImage" component={CaptureImage} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
