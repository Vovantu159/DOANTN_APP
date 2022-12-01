import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button, Header} from '../../components';
import {
  Back,
  Message,
  Call,
  FiveStar,
  StartLocation,
  DashSvg,
  Marker,
} from '../../assets/svg/Svg';
import images from '../../assets/images';
import Dash from 'react-native-dash';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {navigate} from '../../navigation/navigationService';
import {getInfoOder} from '../WaitAcceptOder/Helper/Function';
import {useSelector} from 'react-redux';
import {calculatorPrice} from '../History/Helper/Function';
import {colors} from '../../theme/colors';
export default function DeliveryDetail({props, navigation, route}) {
  const oderId = route?.params?.oderId;
  const key = route?.params?.key;
  const token = useSelector((state) => state.auth.currentUser.token);
  const [oderInfo, setOderInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const renderLeft = () => {
    return <Back />;
  };
  const onPressLeft = useCallback(() => {
    navigate('Main');
    // navigation.goBack();
  }, []);
  const goToDirections = useCallback(() => {
    navigate('LiveMapDirection', {
      from_address: oderInfo?.from_address,
      to_address: oderInfo?.to_address,
      oderId: oderInfo?.id,
    });
  }, [oderInfo]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('name', '==', `${oderId}`) // room name === idDon
      .onSnapshot((querySnapshot) => {
        const rooms = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data(),
          };
        });
        setRoom(rooms[0]);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [oderId]);
  useEffect(() => {
    setLoading(true);
    getInfoOder(token, oderId).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setOderInfo(res.resJson);
      }
    });
  }, [oderId, token]);
  const goToChat = useCallback(() => {
    navigation.navigate('Message', {thread: room});
  }, [navigation, room]);
  return (
    <View style={styles.container}>
      <Header
        title="Chi tiết đơn"
        renderLeft={renderLeft}
        onPressLeft={onPressLeft}
      />
      <ActivityIndicator
        animating={loading}
        size="small"
        color={colors.greenOpacity}
      />
      {oderInfo && (
        <ScrollView style={styles.content}>
          <View style={styles.line1}>
            <Text style={styles.txt1}>#D20220122</Text>
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
              defaultSource={images.avatar}
              source={{uri: oderInfo?.customerAvatar}}
            />
            <View>
              <Text>{oderInfo?.customerName}</Text>
              <View pointerEvents="none">
                <FiveStar />
              </View>
              <Text>
                <Text style={styles.point}>4.9</Text>{' '}
                <Text style={styles.txtRank}>(Bạch kim)</Text>
              </Text>
            </View>
            <View style={styles.base2}>
              {key === 'Oder' ? (
                <TouchableOpacity style={styles.btn2} onPress={goToChat}>
                  <View pointerEvents="none">
                    <Message />
                  </View>
                </TouchableOpacity>
              ) : null}
              {key === 'Oder' ? (
                <TouchableOpacity
                  style={styles.btn2}
                  onPress={() => {
                    // navigation.navigate('LiveMapDirection');
                  }}>
                  <View pointerEvents="none">
                    <Call />
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {/* ------------ */}
          <View style={{marginVertical: 20}}>
            <View style={styles.base1}>
              <View pointerEvents="none">
                <StartLocation />
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={styles.txt5}>Nhận hàng</Text>
                <Text style={styles.txt6}>{oderInfo?.from_address?.desc}</Text>
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
                <Text style={styles.txt6}>{oderInfo?.to_address?.desc}</Text>
              </View>
            </View>
          </View>
          {/* -------- */}
          <View style={styles.note}>
            <Text style={styles.txtNote}>Ghi chú:</Text>

            <Text style={styles.txtContentNote}>{oderInfo?.user_note}</Text>
          </View>
          {/* ----- */}
          {oderInfo?.items.map((e, index) => (
            <View key={index} style={styles.itemBill}>
              <Text>
                {e.quantity} x {e.name}
              </Text>
              <Text>
                {e.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                vnđ
              </Text>
            </View>
          ))}
          <View style={styles.price}>
            <Text>Tạm tính</Text>
            <Text>
              {calculatorPrice(oderInfo?.items)
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
              {oderInfo?.shipping_cost
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vnđ
            </Text>
          </View>
          <Dash dashColor="#CFD8DC" style={styles.dashLine} />
          <View style={styles.price}>
            <Text>Thanh toán:</Text>
            <Text>
              {(calculatorPrice(oderInfo.items) + oderInfo.shipping_cost)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vnđ
            </Text>
          </View>
          {key === 'Oder' ? (
            <Button
              titleFontsize={18}
              title="Chỉ đường"
              style={styles.btn3}
              onPress={goToDirections}
            />
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}
