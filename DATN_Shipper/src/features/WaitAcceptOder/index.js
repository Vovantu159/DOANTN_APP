/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback, useState} from 'react';
import {TouchableOpacity, Text, View, Image, Alert} from 'react-native';
import {StartLocation, DashSvg, Marker, Drawer} from '../../assets/svg/Svg';
import {Header} from '../../components';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from './styles';
import {removeLink} from '../../redux/reducers/handeNotifiSlice';
import images from '../../assets/images';
import {Button} from '../../components';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  acceptOder,
  declineOder,
  getInfoOder,
  shareOder,
} from './Helper/Function';
import {goBack, navigate} from '../../navigation/navigationService';
import {calculatorPrice} from '../History/Helper/Function';
import {shippingStart} from '../../redux/reducers/shippingSlice';
export default function AwaitAcceptOder({props, navigation, route}) {
  const oderId = route?.params?.item?.oderId;
  console.log('pram', route);
  const token = useSelector((state) => state.auth.currentUser.token);
  const [loading, setLoading] = useState(false);
  const [oderInfo, setOderInfo] = useState(null);
  console.log('oder', oderInfo);
  console.log('Wait', route?.params);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeLink());
    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getInfoOder(token, oderId).then((res) => {
      console.log('res', res);
      if (res.status === 200) {
        setOderInfo(res.resJson);
      }
    });
  }, [oderId, token]);
  const renderLeft = () => <Drawer />;
  const _acceptOder = useCallback(() => {
    setLoading(true);
    acceptOder(token, oderId).then((res) => {
      console.log('check', res);
      setLoading(false);
      if (res.status === 200) {
        //Bat trang thai shipping
        dispatch(shippingStart(oderId));
        //Cap nhat vi tri
        //Tao room chat
        firestore()
          .collection('THREADS')
          .add({
            name: `${oderId}`, // Thay the bang ID cua don hang
          })
          .then(() => {
            navigation.navigate('DeliveryDetail', {
              oderId: oderId,
              key: 'Oder',
            });
          });
      } else {
        Alert.alert('Thông báo', 'Không thể thực hiện', [
          {text: 'Thử lại', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, oderId, token]);
  const _decline = useCallback(() => {
    setLoading(true);
    declineOder(token, oderId).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        Alert.alert('Thông báo', 'Bạn đã từ chối đơn hàng', [
          {text: 'Trở về', onPress: () => goBack()},
        ]);
      }
    });
  }, [oderId, token]);
  const _shareOder = () => {
    navigate('ShareDelivery', {oderId});
  };
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={() => {
          navigation.goBack();
        }}
        title="Đơn hàng mới"
      />
      <View style={styles.content}>
        {oderInfo && (
          <View style={styles.modal}>
            <View style={styles.info}>
              <Image style={styles.avt} source={images.avatar} />
              <View style={{alignSelf: 'center', marginLeft: 10}}>
                <Text style={styles.txt1}>{oderInfo?.customerName}</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.txt2}>Tiền mặt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.txt2}>Ưu đãi</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{alignSelf: 'center', alignItems: 'flex-end', flex: 1}}>
                <Text style={styles.txt3}>
                  {' '}
                  {(calculatorPrice(oderInfo.items) + oderInfo.shipping_cost)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                  vnđ
                </Text>
                <Text style={styles.txt4}>{oderInfo?.distance} km</Text>
              </View>
            </View>
            <View style={styles.location}>
              <View style={styles.base1}>
                <View pointerEvents="none">
                  <StartLocation />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.txt5}>Nhận hàng</Text>
                  <Text style={styles.txt6}>{oderInfo?.from_address.desc}</Text>
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
                  <Text style={styles.txt6}>{oderInfo?.to_address.desc}</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Button
                  onPress={_decline}
                  style={styles.btn2}
                  title="Từ chối"
                  titleFontsize={16}
                />
                <Button
                  onPress={_acceptOder}
                  style={styles.btn3}
                  title="Nhận đơn"
                  titleFontsize={16}
                />
              </View>
              {oderInfo?.is_sharable === 1 ? (
                <Button
                  onPress={_shareOder}
                  style={styles.btn4}
                  title="Share"
                  titleFontsize={16}
                />
              ) : null}
              {/* {oderInfo?.is_sharable && (

              )} */}
            </View>
          </View>
        )}
      </View>
      <Spinner visible={loading} textStyle={{color: '#FFF'}} />
    </View>
  );
}
