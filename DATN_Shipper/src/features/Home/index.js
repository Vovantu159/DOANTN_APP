/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Switch, Platform, StatusBar, Alert} from 'react-native';
import {styles} from './styles';
import {Header, MyMap} from '../../components';
import {STATUSBAR_HEIGHT} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import MapView, { Marker } from "react-native-maps";
import {changeStatus} from '../../redux/reducers/statusSlice';
import {Drawer, OffMode} from '../../assets/svg/Svg';
import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import {changeStatusApi, updateCurrentLocation} from './Helper';
import {subcribeTopic} from '../../config/Firebase/FirebaseService';
import BackgroundTimer from 'react-native-background-timer';
import {locationPermission, getCurrentLocation} from './Helper/Location';
import database from '@react-native-firebase/database';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../../constants/index';
import {shippingStart} from '../../redux/reducers/shippingSlice';
import {getProfile} from '../Setting/Helper/Function';
import {navigate} from '../../navigation/navigationService';
import {updateInfo} from '../../redux/reducers/authenticationSlice';
import {getInfoOder} from '../WaitAcceptOder/Helper/Function';
export default function Home({props, navigation}) {
  const token = useSelector((state) => state.auth.currentUser.token);
  const shippingStatus = useSelector((state) => state.shippingReducer);
  const profile = useSelector((state) => state.auth.currentUser.profile);
  // console.log(token);
  // console.log('Profile', profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.statusReducer.online);
  const [isDirection, setIsDirection] = useState(false);
  const [myLocation, setMyLocation] = useState({});

  const openDrawer = () => {
    navigation.openDrawer();
  };

  // Dang ki fcm
  useEffect(() => {
    SplashScreen.hide();
    subcribeTopic('a-topic');
  }, []);

  //Cap nhat trang thai tai xe
  useEffect(() => {
    changeStatusApi(token, status ? 'online' : 'offline').then((res) => {
      if (res.status !== 200) {
        // alert('Server error');
      }
    });
  }, [status, token]);
  //Tracking
  useEffect(() => {
    if (status) {
      // dispatch(shippingStart(54));
      tracking();
    } else {
      endTracking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  useEffect(() => {
    updateCurrentLocation(token, myLocation).then((res) => {
      // console.log('Cap nhat vi tri realtime', res);
    });
    if (status && shippingStatus.oderId) {
      console.log('Debug');
      const tmp = {
        latitude: myLocation.lat,
        longitude: myLocation.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      upLoadTracking(tmp, shippingStatus.oderId);
    }
  }, [myLocation, shippingStatus, status, token]);
  //Kiem tra avatar
  useEffect(() => {
    getProfile(token).then((res) => {
      if (res.status === 200) {
        const oderId = res.resJson.data.delivering_order_id;
        //Kiẻm tra xem có đơn hàng đang giao không
        getInfoOder(token, oderId).then((res1) => {
          setLoading(false);
          if (res1.status === 200) {
            dispatch(shippingStart(oderId));
          }
        });
        if (res.resJson.data.avatar === 'storage/driver/avatar.png') {
          Alert.alert(
            'Thông báo',
            'Cập nhật ảnh đại diện để dễ dàng nhận diện',
            [
              {
                text: 'Đồng ý',
                onPress: () => navigate('EditProfile', res.resJson.data),
              },
            ],
          );
        } else {
          // console.log('avatar', res.resJson);
          dispatch(updateInfo(res.resJson.data));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //---------//
  const renderLeft = () => {
    return (
      <View pointerEvents="none">
        <Drawer />
      </View>
    );
  };
  const renderRight = () => {
    return (
      <Switch
        trackColor={status ? '#90C84B' : 'black'}
        thumbColor={status ? '#90C84B' : 'black'}
        ios_backgroundColor="#FFFFFF"
        onValueChange={() => {
          setIsDirection(false);
          dispatch(changeStatus(!status));
        }}
        value={status}
      />
    );
  };
  //Upload realtime location
  const upLoadTracking = (location, oderId) => {
    // Upload vi tri khi dang ship don
    console.log('Check', location);
    database()
      .ref(`/users/${oderId}`)
      .set({
        id: Math.random(100),
        myLocation: location,
      })
      .then(() => console.log('Data set.'));
  };
  const tracking = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      getLiveLocation();
    }, 3000);
  };
  const endTracking = () => {
    BackgroundTimer.stopBackgroundTimer();
  };
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
      const location = {
        lat: latitude,
        lng: longitude,
      };
      setMyLocation(location);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <Header
        style={{marginTop: Platform.OS === 'ios' ? STATUSBAR_HEIGHT : 0}}
        title={status ? 'Online' : 'Offline'}
        renderLeft={renderLeft}
        renderRight={renderRight}
        onPressLeft={openDrawer}
      />
      <View style={styles.content}>
        {!status ? (
          <View pointerEvents="none" style={styles.messageOffline}>
            <OffMode />
            <View style={{marginLeft: 20}}>
              <Text style={styles.txtMessage}>Chưa sẵn sàng!</Text>
              <Text style={styles.txtMessage}>
                Bật sẵn sàng để nhận chuyến mới
              </Text>
            </View>
          </View>
        ) : null}
        {/* <MyMap isDirection={isDirection} /> */}
        <MapView
    style={{ position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,}}
    region={{
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.001663,
        longitudeDelta: 0.002001,
            }}
        // onRegionChangeComplete={this.onRegionChange}
>
</MapView>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
      </View>
    </View>
  );
}
