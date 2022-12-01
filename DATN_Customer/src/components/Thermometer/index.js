import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
export default function Thermometer(props) {
  const {temperature, containerStyles} = props;
  return (
    <View style={{alignSelf: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <View style={[stylesTemp.container, {height: temperature}]}>
          <View
            style={[
              stylesTemp.content,
              containerStyles,
              {left: temperature <= 10 ? 25 : 20},
            ]}>
            <Text style={{alignSelf: 'center'}}>{temperature}C</Text>
          </View>
        </View>
        <View style={stylesTemp.bottom}>
          <View style={stylesTemp.contentBottom} />
        </View>
      </View>
    </View>
  );
}
Thermometer.propTypes = {
  temperature: PropTypes.number,
  containerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Thermometer.defaultProps = {
  temperature: 50,
  containerStyles: {},
};
const stylesTemp = StyleSheet.create({
  container: {
    //height: 200,
    width: 18,
    backgroundColor: 'red',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginBottom: 16,
  },
  content: {
    height: 20,
    width: 50,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 10,
  },
  bottom: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    marginTop: -30,
    justifyContent: 'center',
    zIndex: -1,
  },
  contentBottom: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});
