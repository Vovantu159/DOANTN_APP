import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {LocationStart, Marker, FiveStar} from '../../../assets/svg/Svg';
import Images from '../../../assets/images';
import Dash from 'react-native-dash';
import {styles} from './styles';
import {navigate} from '../../../navigation/navigationService';
import moment from 'moment';
const Item = ({item, index}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigate('DeliveryDetail', {item})}>
      <Text style={styles.txtDate}>
        {moment(item.created_at).format('DD-MM-YYYY, hh:ss a')}
      </Text>
      <View style={styles.line2}>
        <Image
          style={styles.avt}
          source={{uri: item.driver.avatar}}
          defaultSource={Images.img.avata}
        />
        <View style={styles.leftLine2}>
          <Text style={styles.txtName}>
            {item.driver.name ? item.driver.name : 'Trần Thành Công'}
          </Text>
          <View pointerEvents="none">{/* <FiveStar /> */}</View>
          <Text style={styles.txt1}>
            <Text style={styles.txtNumberStar}>
              Đánh giá:{' '}
              {item?.driver?.review_rate
                ? `${item?.driver?.review_rate}/5`
                : 'Chưa có đánh giá'}
            </Text>{' '}
            {item?.driver?.review_rate ? 'Bởi khách hàng' : null}
          </Text>
        </View>
      </View>
      <View style={[styles.line3, {marginTop: 20}]}>
        <View pointerEvents="none">
          <LocationStart />
        </View>
        <Text style={styles.txtLocation}>{item.from_address.desc}</Text>
      </View>
      <Dash style={styles.dash} />
      <View style={styles.line3}>
        <View pointerEvents="none">
          <Marker />
        </View>
        <Text style={styles.txtLocation}>{item.to_address.desc}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(Item);
