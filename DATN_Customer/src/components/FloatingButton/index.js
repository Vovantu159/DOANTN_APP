import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import PropTypes from 'prop-types';
import Images from '../../assets/images';
export default function Index(props) {
  const {
    listItem,
    onPressItem,
    color,
    distanceToEdge,
    overlayColor,
    position,
    buttonSize,
  } = props;
  return (
    <FloatingAction
      actions={listItem}
      onPressItem={onPressItem}
      color={color} // color root btn
      distanceToEdge={distanceToEdge} // margin
      overlayColor={overlayColor}
      position={position} // right - center - left
      buttonSize={buttonSize}
    />
  );
}
Index.propTypes = {
  listItem: PropTypes.array,
  onPressItem: PropTypes.func,
  color: PropTypes.string,
  distanceToEdge: PropTypes.number,
  overlayColor: PropTypes.string,
  position: PropTypes.string,
  buttonSize: PropTypes.number,
};

Index.defaultProps = {
  listItem: [
    {
      text: 'Item 1',
      icon: Images.img.heart,
      name: 'bt_1',
      position: 1,
      tintColor: '#F44336',
      color: '#FFFFFF',
    },
    {
      text: 'Item 2', //optional
      icon: Images.img.heart,
      name: 'bt_2',
      position: 2,
      tintColor: '#F44336',
      color: '#FFFFFF',
    },
    {
      text: 'Item 3',
      icon: Images.img.heart,
      name: 'bt_3',
      position: 3,
      tintColor: '#F44336',
      color: '#FFFFFF',
    },
    {
      text: 'Item 4',
      icon: Images.img.heart,
      name: 'bt_4',
      position: 4,
      tintColor: '#F44336',
      color: '#FFFFFF',
    },
  ],
  onPressItem: () => {},
  color: '#BBDEFB',
  distanceToEdge: 10,
  overlayColor: 'transparent',
  position: 'right',
  buttonSize: 56,
};
