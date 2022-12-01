import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {HeaderTab} from '../../components';
import {verticalScale} from 'react-native-size-matters';
import Info from './Item/Info';
import ItemMenu from './Item/ItemMenu';
import {dataMenu} from './data';
const roomId = 'TestDon2022';

export default function Profile({props, navigation}) {
  const renderMenu = ({item, index}) => {
    return (
      <ItemMenu
        item={item}
        index={index}
        onPress={() => {
          // eslint-disable-next-line no-lone-blocks
          {
            item.id === 7
              ? navigation.replace('Auth')
              : navigation.navigate(item.screen, {roomName: roomId});
          }
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <HeaderTab ishShowTitle={false} bgHeight={{height: verticalScale(126)}} />
      <Info />
      <FlatList
        contentContainerStyle={{paddingTop: verticalScale(10)}}
        data={dataMenu}
        renderItem={renderMenu}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
