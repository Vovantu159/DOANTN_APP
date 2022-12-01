import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import {Text} from '../../../components';
import {styles} from '../styles';
import {
  CancelIcon,
  SuccessIcon,
  TicketIcon,
  SystemIcon,
} from '../../../assets/svg/Svg';
import moment from 'moment';
export default function NotifiItem(props) {
  const {item} = props;
  const status = item?.data?.key;
  return (
    <TouchableOpacity style={styles.itemNotifi} onPress={() => {}}>
      <View style={styles.icon}>
        {status === 'AcceptOder' ? (
          <TicketIcon />
        ) : status === 'CompleteOder' ? (
          <SuccessIcon />
        ) : (
          <CancelIcon />
        )}
      </View>
      <View style={styles.content}>
        <Text>{moment(item.updated_at).format('DD-MM-YYYY, hh:ss a')}</Text>
        <Text fontSize={scale(14)} style={styles.textTitle}>
          {status === 'AcceptOder'
            ? 'Tài xế đã nhận đơn hàng'
            : status === 'CompleteOder'
            ? 'Đơn hàng giao thành công'
            : 'Tài xế không nhận đơn hàng'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
