/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  StartLocation,
  Marker,
  DashSvg,
  Total,
  RightArrow,
} from '../../../assets/svg/Svg';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../../theme/colors';
import moment from 'moment';
import {calculatorPrice} from '../../Delivering/Helper/Function';
import {navigate} from '../../../navigation/navigationService';
const ItemHistory = ({item, index}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigate('DeliveryDetail', {oderId: item.id, key: 'History'})
      }>
      <Text style={styles.txtDate}>
        {moment(item.created_at).format('DD-MM-YYYY - h:mm A')}
      </Text>
      <View style={styles.row}>
        <View pointerEvents="none">
          <StartLocation />
        </View>
        <Text numberOfLines={2} style={styles.txtItem}>
          {item.from_address.desc}
        </Text>
      </View>
      <View style={styles.dash} pointerEvents="none">
        <DashSvg />
      </View>
      <View style={styles.row}>
        <View pointerEvents="none">
          <Marker />
        </View>
        <Text numberOfLines={2} style={styles.txtItem}>
          {item.to_address.desc}
        </Text>
      </View>
      <View style={styles.footerItem}>
        <View pointerEvents="none">
          <Total />
        </View>
        <Text style={{marginLeft: 10}}>
          {(calculatorPrice(item.items) + item.shipping_cost)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
          vnđ
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <Text
            style={{
              marginLeft: '50%',
              color: item.status_code === 3 ? '#45BA3A' : colors.redColor,
            }}>
            {item.status_code === 3 ? 'Hoàn tất' : 'Đã huỷ'}
          </Text>
          <View pointerEvents="none">
            <RightArrow />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemHistory);
const styles = StyleSheet.create({
  item: {
    width: '90%',
    minHeight: verticalScale(150),
    marginVertical: 10,
    backgroundColor: colors.white_background,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtItem: {
    marginLeft: 10,
    marginRight: 5,
    flexShrink: 1,
  },
  dash: {
    paddingLeft: 6,
  },
  txtDate: {
    marginBottom: 20,
  },
  footerItem: {
    borderTopColor: '#D8D8D8',
    flexDirection: 'row',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 15,
    marginBottom: 10,
  },
});
