import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import {styles} from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../theme/colors';
import Images from '../../../assets/images';
export default function ItemMenu(props) {
  const {item, index, onPress} = props;
  return (
    <TouchableOpacity style={styles.itemMenu} onPress={onPress}>
      <Text fontSize={16}>{item.content}</Text>
      {Images.icons.next}
    </TouchableOpacity>
  );
}
