import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import PropTypes from 'prop-types';
export default function CartComponent(props) {
  const {countItem} = props;
  return (
    <View style={styles.container}>
      <View style={styles.number}>
        <Text style={styles.txtNumber}>
          {countItem >= 10 ? '9+' : countItem}
        </Text>
      </View>
      <AntDesign
        name="shoppingcart"
        size={28}
        style={styles.cartIcon}
        color={colors.green_background}
      />
    </View>
  );
}
CartComponent.propTypes = {
  countItem: PropTypes.number,
};
CartComponent.defaultProps = {
  countItem: 9,
};
const styles = StyleSheet.create({
  container: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: 'transparent',
  },
  cartIcon: {marginTop: 12, marginLeft: 2},
  number: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.redColor,
    position: 'absolute',
    left: 16,
    top: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNumber: {
    color: colors.white_background,
  },
});
