import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import images from '../../assets/images';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const MyMap = ({myLocation}) => {
  console.log('Re-render my map');
  const refMap = useRef();
  useEffect(() => {
    setCenter(myLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation]);
  const setCenter = (location) => {
    if (!refMap) {
      return;
    }
    refMap.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  return (
    <MapView
      ref={refMap}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={{flex: 1}}
      initialRegion={myLocation}
      iregion={myLocation}>
      <Marker
        coordinate={myLocation}
        image={images.img.greenMarker}
        title="Vị trí của bạn"
      />
      <Circle
        center={myLocation}
        radius={200}
        fillColor="rgba(255, 212, 40, 0.3)"
        strokeColor="rgba(255, 212, 40, 0.3)"
      />
    </MapView>
  );
};
export default React.memo(MyMap);
