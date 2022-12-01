import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerCustom from './drawernavigation';
import {Auth} from './stacknavigation';
import Wallet from '../features/MyWallet';
import AddWallet from '../features/MyWallet/AddWallet';
import History from '../features/History';
import Nofication from '../features/Notification';
import Invitefriends from '../features/Invitefriends';
import Setting from '../features/Setting';
import Statics from '../features/Statics';
import Info from '../features/Profile/Info';
import EditProfile from '../features/Profile/Edit';
import DeliveryDetail from '../features/DeliveryDetail';
import Directions from '../features/Directions';
import Message from '../features/Message';
import LiveMapDirection from '../components/LiveMapDirection';
import ShareDelivery from '../features/ShareDelivery';
import AddGroup from '../features/ShareDelivery/AddFriend';
import AwaitAcceptOder from '../features/WaitAcceptOder';
import Delivering from '../features/Delivering';
import InfoKYC from '../features/InfoKYC';
import {navigate, navigationRef} from './navigationService';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
export default function RootNavigation() {
  const token = useSelector((state) => state.auth.currentUser?.token);
  const isCheck = useSelector((state) => state.auth.currentUser?.profile);
  const handleNotification = useSelector((state) => state.handleNotifiReducer);
  const deepLinking = {
    prefixes: ['https://driver.com', 'driver://'],
    config: {
      AwaitAcceptOder: 'AwaitAcceptOderPatch',
      // AwaitAcceptOder: {
      //   patch: 'AwaitAcceptOder/:itemID',
      //   params: {
      //     itemID: null,
      //   },
      //},
      // run ios in terminal : xcrun simctl openurl booted driver://AwaitAcceptOder
      // run android teminal : adb shell am start -W -a android.intent.action.VIEW -d "driver://AwaitAcceptOder" com.actvn.driver
      // run android teminal : adb shell am start -W -a android.intent.action.VIEW -d "driver://AwaitAcceptOder/10" com.actvn.driver
    },
  };
  useEffect(() => {
    console.log('Handle root', handleNotification);
    const {data, link} = handleNotification;
    if (data?.key === 'NewOder') {
      navigate('AwaitAcceptOder', {item: data});
    }
    if (data?.key === 'Notification') {
      navigate('Nofication');
    }
    return () => {
      // dispatch(removeLink());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNotification]);
  return (
    <NavigationContainer ref={navigationRef} linking={deepLinking}>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{headerShown: false}}>
        {token === null || isCheck === null ? (
          <Stack.Screen name="Auth" component={Auth} />
        ) : (
          <Stack.Screen name="Main" component={DrawerCustom} />
        )}
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="AddWallet" component={AddWallet} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Nofication" component={Nofication} />
        <Stack.Screen name="Invitefriends" component={Invitefriends} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Statics" component={Statics} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
        <Stack.Screen name="Directions" component={Directions} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="LiveMapDirection" component={LiveMapDirection} />
        <Stack.Screen name="ShareDelivery" component={ShareDelivery} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
        <Stack.Screen name="AwaitAcceptOder" component={AwaitAcceptOder} />
        <Stack.Screen name="Delivering" component={Delivering} />
        <Stack.Screen name="InfoKYC" component={InfoKYC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
