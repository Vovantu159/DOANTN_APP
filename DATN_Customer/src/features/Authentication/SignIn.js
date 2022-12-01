import React, {useEffect, useState, useCallback} from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import SplashScreen from 'react-native-splash-screen';
import {TextInputOutLine, Button, Text} from '../../components';
import Swiper from 'react-native-swiper';
import Images from '../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import {
  loginOTP,
  registerOTP,
  formatPhoneNumber,
  loginPassword,
} from './Helper/Functions';
import {navigate} from '../../navigation/navigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../../redux/reducers/authenSlice';
export default function SignIn({props, navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const signUp = useCallback(() => {
    //Goi api dang ki
    registerOTP(formatPhoneNumber(phoneNumber)).then((res) => {
      console.log('Debug 2', res);
      if (res.status === 204) {
        navigate('VeriOTP', {key: 'SignUp', phone: phoneNumber});
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại', [
          {text: 'Đồng ý', onPress: () => console.log('ok')},
        ]);
      }
    });
  }, [phoneNumber]);
  const loginWithPassword = useCallback(() => {
    setLoading(true);
    loginPassword(formatPhoneNumber(phoneNumber), password).then((res) => {
      setLoading(false);
      if (res.error && res.errorCode.phone_number) {
        Alert.alert(
          'Thông báo',
          'Tài khoản chưa tồn tại, vui lòng đăng kí tài khoản',
          [{text: 'Đồng ý', onPress: () => console.log('ok')}],
        );
      }
      if (res.error && res.errorCode.password) {
        Alert.alert(
          'Thông báo',
          'Tài khoản hoặc mật khẩu chưa đúng, vui lòng thử lại',
          [{text: 'Đồng ý', onPress: () => console.log('ok')}],
        );
      }

      dispatch(signInSuccess(res));
    });
  }, [phoneNumber, password, dispatch]);
  const validationPhoneNumber = async () => {
    setLoading(true);
    let a = phoneNumber.substr(0, 1);
    a = '+84';
    let b = phoneNumber.substr(1);
    const phoneFormat = `${a}${b}`;
    loginOTP(phoneFormat)
      .then((res) => {
        console.log('Debug check sdt', res.status);
        if (res.status === 204) {
          //Sdt da dc dang ki truoc do
          setLoading(false);
          navigate('VeriOTP', {key: 'SignIn', phone: phoneNumber});
        } else {
          //SDT chua co trong csdl
          Alert.alert(
            'Thông báo',
            `Tài khoản chưa tồn tại, sử dụng số ${phoneNumber} để tạo tài khoản mới`,
            [
              {
                text: 'Huỷ',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Đồng ý',
                onPress: () => {
                  setLoading(false);
                  signUp();
                },
              },
            ],
          );
        }
      })
      .catch((error) => {
        console.log('Catch', error);
      });
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper style={styles.wrapper} showsButtons={false}>
          <View style={styles.slide}>
            <Image source={Images.img.ecommerce1} />
          </View>
          <View style={styles.slide}>
            <Image source={Images.img.ecommerce2} />
          </View>
          <View style={styles.slide}>
            <Image source={Images.img.ecommerce3} />
          </View>
        </Swiper>
      </View>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      <Text style={styles.txtTile} fontSize={24}>
        Đăng nhập hoặc đăng ký
      </Text>
      <View style={styles.textInput}>
        <TextInputOutLine
          label="Số điện thoại"
          style={styles.txtInput}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(outlinedLargeText) => {
            setPhoneNumber(outlinedLargeText);
          }}
        />
      </View>
      {usePassword ? (
        <View style={styles.textInput}>
          <TextInputOutLine
            label="Mật khẩu"
            style={styles.txtInput}
            value={password}
            secureTextEntry={true}
            onChangeText={(outlinedLargeText) => {
              setPassword(outlinedLargeText);
            }}
          />
        </View>
      ) : null}
      {usePassword ? (
        <Button
          style={styles.btnLogin}
          title="Đăng nhập"
          titleColor="#FFFFFF"
          onPress={loginWithPassword}
        />
      ) : (
        <Button
          style={styles.btnLogin}
          title="Lấy mã OTP"
          titleColor="#FFFFFF"
          onPress={validationPhoneNumber}
        />
      )}
      <TouchableOpacity
        style={styles.textOption}
        onPress={() => {
          setUsePassword(!usePassword);
        }}>
        <Text style={{color: colors.gray}} fontSize={14}>
          Hoặc sử dụng <Text>{usePassword ? 'OTP' : 'mật khẩu'}</Text>
        </Text>
      </TouchableOpacity>
      {/* <View style={styles.textOption}>
        <Text style={{color: colors.gray}} fontSize={14}>
          Hoặc kết nối qua
        </Text>
      </View> */}
      {/* <View style={styles.socialOption}>
        <TouchableOpacity style={styles.btnSocial}>
          <AntDesign name="facebook-square" size={18} color="#385C8E" />
          <Text style={styles.baseLeft}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnSocial, {marginLeft: 16}]}>
          <AntDesign name="google" size={18} color="#F14336" />
          <Text style={styles.baseLeft}>Google</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
