import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Button, Header} from '../../components';
import {LeftArrowIcon} from '../../assets/svg/Svg';
import {colors} from '../../theme/colors';
import {goBack} from '../../navigation/navigationService';
import {
  DeliveringSuccess,
  FiveStar,
  LocationStart,
  Marker,
} from '../../assets/svg/Svg';
import Dash from 'react-native-dash';
import Images from '../../assets/images';
import {verticalScale} from 'react-native-size-matters';
import {AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
import {calculatorPrice} from '../DetailDelivering/Helper/Function';
import {reviewDriver} from './Helper/Function';
import {useSelector} from 'react-redux';
export default function DetailSuccesDelivery({props, navigation, route}) {
  const token = useSelector(
    (state) => state.authReducer.currentUser?.accessToken,
  );
  const {item} = route?.params;
  const [ratingShipper, setRatingShipper] = useState(5);
  const _reviewDriver = () => {
    reviewDriver(token, item?.id, ratingShipper).then((res) => {
      if (res.status === 200) {
        Alert.alert('Thông báo', 'Đánh giá đơn hàng và tài xế thành công', [
          {text: 'Qua lại', onPress: () => goBack()},
        ]);
      } else {
        Alert.alert('Thông báo', 'Có lỗi xảy ra', [
          {text: 'Thử lại', onPress: () => console.log(res)},
        ]);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <View pointerEvents="none" style={styles.backIcon}>
          <LeftArrowIcon />
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        <Text style={styles.txtID}>#{item.id}</Text>
        <View style={styles.line1}>
          <Text>
            {' '}
            {moment(item?.created_at).format('DD-MM-YYYY  h:mm:ss a')}
          </Text>
          <View pointerEvents="none">
            <DeliveringSuccess />
          </View>
        </View>
        <View style={styles.line2}>
          <Image
            style={styles.avt}
            defaultSource={Images.img.avata}
            source={{uri: item?.customerAvatar}}
          />
          <View style={styles.leftLine2}>
            <Text style={styles.txtName}>{item?.driver?.name}</Text>
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
          <Text style={styles.txtLocation}>{item?.from_address.desc}</Text>
        </View>
        <Dash style={styles.dash} />
        <View style={styles.line3}>
          <View pointerEvents="none">
            <Marker />
          </View>
          <Text style={styles.txtLocation}>{item?.to_address.desc}</Text>
        </View>
        {item?.items.map((e, index) => (
          <View key={index} style={styles.itemBill}>
            <Text>
              {e.quantity} x {e.name}
            </Text>
            <Text>
              {e.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} vnđ
            </Text>
          </View>
        ))}

        <View style={styles.price}>
          <Text>Phí giao hàng:</Text>
          <Text>
            {' '}
            {item.shipping_cost
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>
        <Dash dashColor="#CFD8DC" style={styles.dashLine} />
        <View style={styles.price}>
          <Text>Số tiền thanh toán:</Text>
          <Text>
            {(calculatorPrice(item.items) + item.shipping_cost)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={item?.driver_rate}
            // reviews={['A', 'b', 'c', 'd', 'e']}
            size={22}
            selectedColor={colors.green_background}
            onFinishRating={(rate) => {
              setRatingShipper(rate);
            }}
          />
        </View>
        {item?.driver_rate === null ? (
          <Button
            onPress={_reviewDriver}
            titleColor="#FFFFFF"
            style={styles.btnRate}
            title="Đánh giá"
            titleFontsize={16}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  line1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  txtID: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  avt: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: 999999,
  },
  line2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  leftLine2: {
    marginLeft: 20,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  txtNumberStar: {
    color: '#FDBB2F',
  },
  txt1: {
    color: '#BDBDBD',
    marginTop: 5,
  },
  line3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  dash: {
    height: 30,
    width: 1,
    flexDirection: 'column',
    marginLeft: 26,
    marginVertical: 3,
  },
  txtLocation: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemBill: {
    height: 50,
    borderBottomColor: '#CFD8DC',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  price: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  btnRate: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: colors.greenOpacity,
    borderRadius: 10,
    height: 30,
  },
});
