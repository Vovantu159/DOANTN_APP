import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {MapTracking, Header} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {goBack, navigate} from '../../navigation/navigationService';
import database from '@react-native-firebase/database';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const renderLeft = () => <AntDesign name="arrowleft" size={24} />;
export default function Tracking({navigation, route}) {
  console.log('Debug route', route);
  const oderId = route?.params?.item?.oderId || route?.params?.item;
  const [myLocation, setMyLocation] = useState({
    latitude: 20.9800038,
    longitude: 105.7864267,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  useEffect(() => {
    console.log('id', oderId);
    const onValueChange = database()
      .ref(`/users/${oderId}`)
      .on('value', (snapshot) => {
        //hien thi toa do len map
        console.log('User data: ', snapshot.val());
        if (snapshot.val()?.myLocation) {
          setMyLocation(snapshot.val()?.myLocation);
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${oderId}`).off('value', onValueChange);
  }, [oderId]);
  return (
    <View style={{flex: 1}}>
      <Header
        title="Tài xế đang di chuyển"
        renderLeft={renderLeft}
        onPressLeft={() => navigate('Main')}
      />
      <MapTracking myLocation={myLocation} />
    </View>
  );
}
