import React, {Component} from 'react';
import {View, TextInput, Image, FlatList, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text, GoogleAutoSearch} from '../../components';
import {styles} from './styles';
import Dash from 'react-native-dash';
import PropTypes from 'prop-types';
import {colors} from '../../theme/colors';
import {LocationStart, Marker} from '../../assets/svg/Svg';
export default function Inputlocation(props) {
  const {
    topTiltle,
    bottomTitle,
    startLocation,
    endLocation,
    dataLocation,
    containerStyle,
    show,
    inputStartLocation,
    inputEndLocation,
    onfocus,
    placeholderStart,
    placeholderEnd,
    ...rest
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.baseTitle}>{topTiltle}</Text>
      <View style={styles.location}>
        <View pointerEvents="none">
          <LocationStart />
        </View>
        <GoogleAutoSearch
          placeholder={placeholderStart}
          onFocusInput={onfocus}
          onPress={inputStartLocation}
          textInput={styles.textInput}
        />
      </View>
      <View style={styles.center}>
        <Dash style={styles.dash} />
        <View style={styles.line} />
      </View>
      <Text style={styles.baseTitle}>{bottomTitle}</Text>
      <View style={styles.location}>
        <View pointerEvents="none">
          <Marker />
        </View>
        <GoogleAutoSearch
          placeholder={placeholderEnd}
          onFocusInput={onfocus}
          onPress={inputEndLocation}
          textInput={styles.textInput}
        />
      </View>
    </View>
  );
}
Inputlocation.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  topTiltle: PropTypes.string,
  bottomTitle: PropTypes.string,
  startLocation: PropTypes.string,
  endLocation: PropTypes.string,
  dataLocation: PropTypes.array,
  show: PropTypes.bool,
  inputStartLocation: PropTypes.func,
  inputEndLocation: PropTypes.func,
  onfocus: PropTypes.func,
  placeholderEnd: PropTypes.string,
  placeholderStart: PropTypes.string,
};
Inputlocation.defaultProps = {
  containerStyle: {},
  topTiltle: 'ĐIỂM ĐÓN',
  bottomTitle: 'ĐIỂM ĐẾN',
  startLocation: 'Nguyễn Văn Linh',
  endLocation: 'Núi Thành',
  dataLocation: [],
  show: false,
  inputStartLocation: (text) => {
    console.log(text);
  },
  inputEndLocation: (text) => {
    console.log(text);
  },
  onfocus: () => {},
  placeholderStart: 'Điểm nhận hàng',
  placeholderEnd: 'Điểm giao hàng',
};
