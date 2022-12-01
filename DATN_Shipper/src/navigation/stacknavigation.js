import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screen
import SignIn from '../features/Authentication/SignIn';
import PhoneVerify from '../features/Authentication/PhoneVerify';
import Update from '../features/Authentication/UpdateInfo';
import CaptureImage from '../features/Authentication/UpdateInfo/Item/CaptureImages';
import Home from '../features/Home';
import DetailHome from '../features/DetailHome/DetailHome';
const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator  >
      <Stack.Screen
        name="Sigin"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneVerify"
        component={PhoneVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CaptureImage"
        component={CaptureImage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeDetail"
        component={DetailHome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
// const SettingTab = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Setting"
//         component={Setting}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };
export {Auth, HomeTab};
