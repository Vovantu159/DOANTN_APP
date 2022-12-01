import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors} from '../../theme/colors';
import {Drawer} from '../../assets/svg/Svg';
import {goBack, navigate} from '../../navigation/navigationService';
import {getInfoOder} from '../WaitAcceptOder/Helper/Function';
import {getProfile, calculatorPrice, completeOder} from './Helper/Function';
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
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {shippingStop} from '../../redux/reducers/shippingSlice';

const renderLeft = () => <Drawer />;

export default function Delivering({navigation}) {
  const token = useSelector((state) => state.auth.currentUser?.token);
  const [oderInfo, setOderInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const dispatch = useDispatch();
  const getOder = useCallback(() => {
    setLoading(true);
    getProfile(token).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setLoading(true);
        const oderId = res?.resJson?.data?.delivering_order_id;
        getInfoOder(token, oderId).then((res1) => {
          setLoading(false);
          if (res1.status === 200) {
            console.log(res1);
            setOderInfo(res1?.resJson);
          }
        });
      }
    });
  }, [token]);
  useEffect(() => {
     getOder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  useEffect(() => {
    // const unsubscribe = firestore()
    //   .collection('THREADS')
    //   .where('name', '==', `${oderInfo?.id}`) // room name === idDon
    //   .onSnapshot((querySnapshot) => {
    //     const rooms = querySnapshot.docs.map((documentSnapshot) => {
    //       return {
    //         _id: documentSnapshot.id,
    //         name: '',
    //         ...documentSnapshot.data(),
    //       };
    //     });
    //     setRoom(rooms[0]);
    //   });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [oderInfo]);
  const goToChat = useCallback(() => {
    navigate('Message', {thread: room});
  }, [room]);
  const clearTracking = useCallback(async () => {
    //Xoa tracking khi hoan thanh don
    await database().ref(`/users/${oderInfo?.id}`).remove();
  }, [oderInfo]);
  const _completeOder = () => {
    setLoading(true);
    completeOder(token, oderInfo?.id).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        clearTracking();
        dispatch(shippingStop());
        Alert.alert(
          'Thông báo',
          'Bạn đã hoàn thành đơn hàng. Tiếp tục với đơn hàng mới nào',
          [{text: 'Đồng ý', onPress: () => navigate('Main')}],
        );
      } else {
        Alert.alert('Thông báo', 'Không thể kết thúc đơn.', [
          {text: 'Đồng ý', onPress: () => console.log('error', res)},
        ]);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={goBack}
        title="Đơn đang giao"
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
                <Text style={styles.point}>5.0</Text>{' '}
                <Text style={styles.txtRank}>(Bạch kim)</Text>
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
                onPress={() => {
                  // navigation.navigate('LiveMapDirection');
                }}>
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
          <Button
            titleFontsize={18}
            title="Chỉ đường"
            style={styles.btn3}
            onPress={() =>
              navigate('LiveMapDirection', {
                from_address: oderInfo?.from_address,
                to_address: oderInfo?.to_address,
                oderId: oderInfo?.id,
              })
            }
          />
          <Button
            onPress={_completeOder}
            titleFontsize={18}
            title="KẾT THÚC CHUYẾN"
            style={styles.btn4}
          />
        </ScrollView>
      )}
    </View>
  );
}
