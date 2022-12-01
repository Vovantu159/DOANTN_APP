/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {Button, Header} from '../../components';
import {
  LeftArrowIcon,
  Message,
  Call,
  FiveStar,
  LocationStart,
  DashSvg,
  Marker,
} from '../../assets/svg/Svg';
import Dash from 'react-native-dash';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import Images from '../../assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {navigate} from '../../navigation/navigationService';
import {calculatorPrice} from './Helper/Function';
const roomId = 'TestDon2021';
export default function DeliveryDetail({props, navigation, route}) {
  const {item} = route?.params;
  console.log('item', item);
  const [room, setRoom] = useState({});
  const renderLeft = () => {
    return <LeftArrowIcon />;
  };
  const onPressLeft = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const goToDirections = useCallback(() => {
    navigation.navigate('Directions');
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('name', '==', `${item.id}`) // room name === idDon
      .onSnapshot((querySnapshot) => {
        const rooms = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data(),
          };
        });
        console.log('Room', rooms[0]);
        setRoom(rooms[0]);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [item]);
  const goToTracking = useCallback(() => {
    console.log('Track');
    navigate('Tracking', {item: item.id});
  }, [item]);
  const goToChat = useCallback(() => {
    navigation.navigate('RoomChat', {thread: room});
  }, [navigation, room]);
  const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Chi tiết đơn"
        renderLeft={renderLeft}
        onPressLeft={onPressLeft}
      />
      <ScrollView style={styles.content}>
        <View style={styles.line1}>
          <Text style={styles.txt1}>#{item.id}</Text>
          <View style={styles.base2}>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.txt2}>Tiền mặt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.txt2}>Ưu đãi</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* -------- */}
        <View style={styles.line1}>
          <Image
            style={styles.avt}
            defaultSource={Images.img.avata}
            source={{uri: item?.driver?.avatar}}
          />
          <View>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
              {item.driver.name}
            </Text>
            <View pointerEvents="none">{/* <FiveStar /> */}</View>
            <Text>
              <Text style={styles.point}>
                {item?.driver?.review_rate ?? 'Chưa có đánh giá'}
              </Text>{' '}
              {/* <Text style={styles.txtRank}>(Bạch kim)</Text> */}
            </Text>
          </View>
          <View style={styles.base2}>
            <TouchableOpacity style={styles.btn2} onPress={goToChat}>
              <View pointerEvents="none">
                <Message />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => callNumber(item.receiver.receiverPhone)}>
              <View pointerEvents="none">
                <Call />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* ------------ */}
        <View style={{marginVertical: 20}}>
          <View style={styles.base1}>
            <View pointerEvents="none">
              <LocationStart />
            </View>
            <View style={{marginLeft: 15}}>
              <Text style={styles.txt5}>Nhận hàng</Text>
              <Text style={styles.txt6}>{item.from_address.desc}</Text>
            </View>
          </View>
          <View style={styles.dash} pointerEvents="none">
            <DashSvg />
          </View>
          <View style={styles.base1}>
            <View pointerEvents="none">
              <Marker />
            </View>
            <View style={{marginLeft: 15}}>
              <Text style={styles.txt5}>Giao hàng</Text>
              <Text style={styles.txt6}>{item.to_address.desc}</Text>
            </View>
          </View>
        </View>
        {/* -------- */}
        <View style={styles.note}>
          <Text style={styles.txtNote}>Ghi chú:</Text>

          <Text style={styles.txtContentNote}>{item.user_note}</Text>
        </View>
        {/* ----- */}
        {item.items.map((e, index) => (
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
          <Text>Tạm tính:</Text>
          <Text>
            {calculatorPrice(item.items)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>
        <View style={styles.price}>
          <Text>Khuyễn mãi:</Text>
          <Text>0,000đ</Text>
        </View>
        <View style={styles.price}>
          <Text>Phí giao hàng:</Text>
          <Text>
            {item.shipping_cost
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>
        <Dash dashColor="#CFD8DC" style={styles.dashLine} />
        <View style={styles.price}>
          <Text>Thanh toán:</Text>
          <Text>
            {(calculatorPrice(item.items) + item.shipping_cost)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
            vnđ
          </Text>
        </View>
        <Button
          onPress={goToTracking}
          title="Theo dõi giao hàng"
          titleColor={colors.white_background}
          style={styles.btnTracking}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
