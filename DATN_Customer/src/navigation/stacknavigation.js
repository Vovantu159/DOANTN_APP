import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screen
import SignIn from '../features/Authentication/SignIn';
import VerifiOTP from '../features/OTP';
const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sigin"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VeriOTP"
        component={VerifiOTP}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export {Auth};
