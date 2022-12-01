import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import images from '../../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../theme/colors';
import PropTypes from 'prop-types';
import {Drawer} from '../../../assets/svg/Svg';

export default function Header(props) {
  const {title, content, navigation} = props;
  return (
    <ImageBackground
      style={{
        width: scale(375),
        height: verticalScale(232),
      }}
      source={images.walletbgr}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign
            name="menufold"
            size={24}
            style={{
              marginLeft: scale(16),
              marginTop:
                Platform.OS === 'android'
                  ? verticalScale(10)
                  : verticalScale(40),
            }}
            color={colors.white_background}
          />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Ví tài khoản</Text>
        <View style={{width: 50}} />
      </View>
      <View style={styles.content}>
        <Text style={styles.numberMoney}>
          {title.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>
        <Text style={styles.txtDetailMoney}>Số dư hiện tại</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  content: {flex: 1},
  txtTitle: {
    color: colors.white_background,
    marginTop:
      Platform.OS === 'android' ? verticalScale(10) : verticalScale(40),
    fontSize: scale(22),
    fontWeight: 'bold',
  },
  textContent: {
    color: colors.white_background,
    marginTop: verticalScale(10),
    fontSize: verticalScale(14),
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    width: '80%',
    height: verticalScale(34),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#242A37',
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginRight: scale(20),
  },
  numberMoney: {
    alignSelf: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: scale(36),
    color: colors.white_background,
  },
  txtDetailMoney: {
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: scale(15),
    color: colors.white_background,
  },
});

Header.propTypes = {
  title: PropTypes.any,
  content: PropTypes.string,
};
Header.defaultProps = {
  title: '500000',
  content: 'Content',
};
