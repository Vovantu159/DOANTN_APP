import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
const Item = (props) => {
  const {item, index, onPressItem} = props;
  console.log('item', item);
  return (
    <TouchableOpacity style={styles.item} onPress={onPressItem}>
      <Text>aaa</Text>
      {/* <FastImage style={styles.img} source={{uri: item.profile_image}} />
      <View style={styles.contentItem}>
        <View style={{flex: 1}}>
          <Text style={styles.txtItem}>{item.display_name}</Text>
          <Text style={styles.txtItem}>Trạn thái:{index}</Text>
        </View>
        <View style={{flex: 1}}>
          <Entypo
            style={{alignSelf: 'flex-end', marginRight: 20}}
            name="share"
            size={24}
          />
        </View>
      </View> */}
    </TouchableOpacity>
  );
};
const itemHeight = 100;
export default React.memo(Item);
export {itemHeight};
const styles = StyleSheet.create({
  item: {
    height: itemHeight,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginLeft: 20,
    borderRadius: 9999,
  },
  contentItem: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  txtItem: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});
