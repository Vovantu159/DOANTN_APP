import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Text,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {locationPermission, getCurrentLocation} from './Helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../../components';
import {colors} from '../../theme/colors';
import database from '@react-native-firebase/database';
import {Moto} from '../../assets/svg/Svg';
const GOOGLE_MAPS_Direction = 'AIzaSyACZns9fGHaZEwwoQpdIHU41waoEiVSCoU';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LiveMapDirection = ({navigation, route}) => {
  console.log(route);
  const [option, setOption] = useState(false); // false : chỉ đường đi lấy hàng, true chỉ đường đi giao hàng
  const mapRef = useRef();
  const markerRef = useRef();
  const oderId = route?.params?.oderId;
  const [state, setState] = useState({
    //Vi tri hien tai
    curLoc: {
      latitude: 20.9790317,
      longitude: 105.7834574,
    },
    //Diem giao hang
    destinationCords: {
      latitude: route?.params?.to_address?.lat,
      longitude: route?.params?.to_address?.lon,
    },
    //Diem nhan hang
    destinationCords_Oder: {
      latitude: route?.params?.from_address?.lat, // route?.params?.from_address?.lat
      longitude: route?.params?.from_address?.lon, // route?.params?.from_address?.lon
    },
    coordinate: new AnimatedRegion({
      latitude: 20.9800038,
      longitude: 105.7864267,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });

  const {curLoc, destinationCords, coordinate, destinationCords_Oder} = state;
  const goBack = useCallback(() => {
    // clearTracking();
    navigation.goBack();
  }, [navigation]);
  const renderLeft = () => {
    return <AntDesign name="arrowleft" size={24} />;
  };

  useEffect(() => {
    getLiveLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const upLoadTracking = (location) => {
    // Upload vi tri khi dang ship don
    database()
      .ref(`/users/${oderId}`) // thay the bang oderId
      .set({
        id: Math.random(100),
        myLocation: location,
      })
      .then(() => console.log('Data set.'));
  };
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
      animate(latitude, longitude);
      upLoadTracking({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setState({
        ...state,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 5000);
    return () => clearInterval(interval);
  });
  const fetchValue = (data) => {
    setState({
      ...state,
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
console.log('abc',{ ...curLoc,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,});
  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  const renderRight = () => {
    return (
      <Text style={{fontWeight: '600'}}>
        {option ? 'Lấy hàng' : 'Giao hàng'}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        renderLeft={renderLeft}
        onPressLeft={goBack}
        title="Chỉ đường"
        renderRight={renderRight}
        onPressRight={() => setOption(!option)}
      />
      <View style={{flex: 1}}>
        {option ? (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              ...curLoc,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker.Animated
              ref={markerRef}
              coordinate={coordinate}
              image={require('../../assets/images/Oval.png')} // vị trí hiện tại
            />
            {Object.keys(destinationCords).length > 0 && (
              <Marker
                coordinate={destinationCords}
                image={require('../../assets/images/greenMarker.png')} // vị trí giao hàng
              />
            )}
            {Object.keys(destinationCords_Oder).length > 0 && (
              <Marker
                coordinate={destinationCords_Oder}
                image={require('../../assets/images/redMaker.png')} //vị trí nhận hàng
              />
            )}
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords_Oder}
              apikey={GOOGLE_MAPS_Direction}
              strokeWidth={6}
              strokeColor={colors.green_background}
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: 30,
                    // bottom: 300,
                    // left: 30,
                    // top: 100,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          </MapView>
        ) : (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              ...curLoc,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker.Animated
              ref={markerRef}
              coordinate={coordinate}
              image={require('../../assets/images/Oval.png')} // vị trí hiện tại
            />
            {Object.keys(destinationCords).length > 0 && (
              <Marker
                coordinate={destinationCords}
                image={require('../../assets/images/greenMarker.png')} // vị trí giao hàng
              />
            )}
            {Object.keys(destinationCords_Oder).length > 0 && (
              <Marker
                coordinate={destinationCords_Oder}
                image={require('../../assets/images/redMaker.png')} //vị trí nhận hàng
              />
            )}
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={GOOGLE_MAPS_Direction}
              strokeWidth={6}
              strokeColor={colors.green_background}
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: 30,
                    // bottom: 300,
                    // left: 30,
                    // top: 100,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          </MapView>
        )}
        <TouchableOpacity style={styles.centerBtn} onPress={onCenter}>
          <Image source={require('../../assets/images/greenIndicator.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_background,
  },
  centerBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default LiveMapDirection;
