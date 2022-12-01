import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../theme/colors';
import {
  LocationStart,
  Marker,
  TotalPrice,
  RightItemArrow,
} from '../../../assets/svg/Svg';
import Dash from 'react-native-dash';
import {styles} from './styles';
import {navigate} from '../../../navigation/navigationService';
import moment from 'moment';
import {calculatorPrice} from '../../DetailDelivering/Helper/Function';
const Item = (props) => {
  const {item, index} = props;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigate('DetailSuccessDelivery', {item})}>
      <Text style={styles.txtDate}>
        {moment(item.created_at).format('DD-MM-YYYY  h:mm:ss a')}
      </Text>
      <View style={styles.line}>
        <View pointerEvents="none">
          <LocationStart />
        </View>
        <Text style={styles.txtLocation}>{item.from_address.desc}</Text>
      </View>
      <Dash style={styles.dash} />
      <View style={styles.line}>
        <View pointerEvents="none">
          <Marker />
        </View>
        <Text style={styles.txtLocation}>{item.to_address.desc}</Text>
      </View>
      <View style={styles.price}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View pointerEvents="none">
            <TotalPrice />
          </View>
          <Text style={styles.txtTotalPrice}>
            {(calculatorPrice(item.items) + item.shipping_cost)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>

        <View pointerEvents="none">
          <RightItemArrow />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(Item);
