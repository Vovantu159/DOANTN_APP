import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images';
import {colors} from '../../../theme/colors';
const Item = ({index, item, waitingShipper}) => {
  console.log('Tai xe', item);
  return (
    <TouchableOpacity style={styles.container} onPress={waitingShipper}>
      <FastImage style={styles.avt} source={{uri: item.avatar}} />
      <View style={styles.info}>
        <Text style={styles.txtName}>{item.name}</Text>
        <Text style={styles.txtNumber}>Biển số: 34D1-33029</Text>
        <Text style={styles.txtNumber}>Đánh giá: {item?.review_rate}/5</Text>
        <Text style={styles.txtNumber}>
          Khoảng cách: {parseFloat(item.distance).toFixed(2)} km
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.white_background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avt: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 10,
  },
  info: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  txtNumber: {
    fontSize: 14,
    color: colors.gray,
    marginVertical: 2,
  },
});
export default React.memo(Item);
