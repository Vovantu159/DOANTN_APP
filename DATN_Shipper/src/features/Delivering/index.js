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
          'Th??ng b??o',
          'B???n ???? ho??n th??nh ????n h??ng. Ti???p t???c v???i ????n h??ng m???i n??o',
          [{text: '?????ng ??', onPress: () => navigate('Main')}],
        );
      } else {
        Alert.alert('Th??ng b??o', 'Kh??ng th??? k???t th??c ????n.', [
          {text: '?????ng ??', onPress: () => console.log('error', res)},
        ]);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={goBack}
        title="????n ??ang giao"
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
                <Text style={styles.txt2}>Ti???n m???t</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn1}>
                <Text style={styles.txt2}>??u ????i</Text>
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
                <Text style={styles.txtRank}>(B???ch kim)</Text>
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
                <Text style={styles.txt5}>Nh???n h??ng</Text>
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
                <Text style={styles.txt5}>Giao h??ng</Text>
                <Text style={styles.txt6}>{oderInfo?.to_address?.desc}</Text>
              </View>
            </View>
          </View>
          {/* -------- */}
          <View style={styles.note}>
            <Text style={styles.txtNote}>Ghi ch??:</Text>

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
                vn??
              </Text>
            </View>
          ))}
          <View style={styles.price}>
            <Text>T???m t??nh</Text>
            <Text>
              {calculatorPrice(oderInfo?.items)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vn??
            </Text>
          </View>
          <View style={styles.price}>
            <Text>Khuy???n m??i:</Text>
            <Text>0,000??</Text>
          </View>
          <View style={styles.price}>
            <Text>Ph?? giao h??ng:</Text>
            <Text>
              {oderInfo?.shipping_cost
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vn??
            </Text>
          </View>
          <Dash dashColor="#CFD8DC" style={styles.dashLine} />
          <View style={styles.price}>
            <Text>Thanh to??n:</Text>
            <Text>
              {(calculatorPrice(oderInfo.items) + oderInfo.shipping_cost)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
              vn??
            </Text>
          </View>
          <Button
            titleFontsize={18}
            title="Ch??? ???????ng"
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
            title="K???T TH??C CHUY???N"
            style={styles.btn4}
          />
        </ScrollView>
      )}
    </View>
  );
}
