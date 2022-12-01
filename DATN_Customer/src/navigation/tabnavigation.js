import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SuccessfulDelivery from '../features/DeliverySuccessful';
import Delivering from '../features/Delivering';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
const TabCustom = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{showIcon: true, labelStyle: {fontSize: 12}}}>
      <Tab.Screen
        name="Đang giao"
        component={Delivering}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={20}
                  color={'#2F80ED'}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={20}
                  color={'gray'}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Đã giao"
        component={SuccessfulDelivery}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <MaterialIcons name="cloud-done" size={20} color={'#2F80ED'} />
              );
            } else {
              return (
                <MaterialIcons name="cloud-done" size={20} color={'gray'} />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabCustom;
