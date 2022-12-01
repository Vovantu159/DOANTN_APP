/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
export default function Header(props) {
  const {Status, onChange, navigation, inCome} = props;
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
        <Text style={styles.txtTitle}>Thống kê thu nhập</Text>
        <View style={{width: 50}} />
      </View>
      <View style={styles.content}>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => onChange(0)}
            style={[
              styles.btn1,
              {
                backgroundColor: Status ? '#242A37' : null,
              },
            ]}>
            <Text style={styles.txtBtn}>Tuần này</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChange(1)}
            style={[
              styles.btn2,
              {
                backgroundColor: Status ? null : '#242A37',
              },
            ]}>
            <Text style={styles.txtBtn}>Tháng này</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.txtDetailMoney}>{inCome} vnđ</Text>
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
    flexDirection: 'row',
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
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: scale(18),
    color: colors.white_background,
  },
  btn1: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    flex: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {color: '#FDD835'},
});

Header.propTypes = {
  Status: PropTypes.bool,
  onChange: PropTypes.func,
};
Header.defaultProps = {
  Status: true,
  onChange: () => {},
};
