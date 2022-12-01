import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HomeTab, SettingTab} from './stacknavigation';
const Tab = createBottomTabNavigator();
const TabCustom = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{showIcon: true, labelStyle: {fontSize: 9}}}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return <AntDesign name="home" size={20} color={'#2F80ED'} />;
            } else {
              return <AntDesign name="home" size={20} color={'gray'} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={SettingTab}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return <AntDesign name="setting" size={20} color={'#2F80ED'} />;
            } else {
              return <AntDesign name="setting" size={20} color={'gray'} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabCustom;
