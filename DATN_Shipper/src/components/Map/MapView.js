import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import images from '../../assets/images';
import MapViewDirections from 'react-native-maps-directions';
import {Moto} from '../../assets/svg/Svg';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const GOOGLE_MAPS_Direction = 'AIzaSyACZns9fGHaZEwwoQpdIHU41waoEiVSCoU'; //work
const MyMap = (props) => {
  console.log('Re-render my map');
  const {isDirection} = props;
  const refMap = useRef();
  const [myLocation, setMyLocation] = useState({
    latitude: 20.9800038,
    longitude: 105.7864267,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [endLocation, setEndLocation] = useState({
    latitude: 20.9866488,
    longitude: 105.7915953,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  useEffect(() => {
    setCenter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setCenter = (location) => {
    if (!refMap) {
      return;
    }
    refMap.current.animateToRegion(myLocation);
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
        // image={images.myLocation}
        title="Vị trí của bạn">
        <Moto />
      </Marker>
      <Circle
        center={myLocation}
        radius={200}
        fillColor="rgba(255, 212, 40, 0.3)"
        strokeColor="rgba(255, 212, 40, 0.3)"
      />
      {isDirection ? (
        <MapViewDirections
          origin={myLocation}
          destination={endLocation}
          apikey={GOOGLE_MAPS_Direction}
          strokeColor="red"
          strokeWidth={5}
          optimizeWaypoints={true}
          onStart={() => {}}
        />
      ) : null}
    </MapView>
  );
};
export default React.memo(MyMap);
