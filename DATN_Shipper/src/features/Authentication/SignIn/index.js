import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import SplashScreen from 'react-native-splash-screen';
import {TextInputOutLine, Button, Text} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../theme/colors';
import images from '../../../assets/images';
import {navigate} from '../../../navigation/navigationService';
import {loginOTP, formatPhoneNumber, registerOTP} from '../Helper/Function';
import Spinner from 'react-native-loading-spinner-overlay';
export default function SignIn({navigation}) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const signUp = useCallback(() => {
    registerOTP(formatPhoneNumber(phone)).then((res) => {
      console.log('Debug 2', res);
      if (res.status === 204) {
        navigate('PhoneVerify', {key: 'SignUp', phone: phone});
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại', [
          {text: 'Đồng ý', onPress: () => console.log('ok')},
        ]);
      }
    });
  }, [phone]);
  const validationLogin = useCallback(() => {
    setLoading(true);
    loginOTP(formatPhoneNumber(phone)).then((res) => {
      console.log('Login check', res);
      if (res.status === 204) {
        //Sdt da dc dang ki truoc do
        console.log('Login', res.status);
        setLoading(false);
        navigate('PhoneVerify', {key: 'SignIn', phone});
      } else {
        //SDT chua co trong csdl
        Alert.alert(
          'Thông báo',
          `Tài khoản chưa tồn tại, sử dụng số ${phone} để tạo tài khoản mới`,
          [
            {
              text: 'Huỷ',
              onPress: () => {
                setLoading(false);
              },
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Image source={images.logo} />
      </View>
      <Text style={styles.txtTile} fontSize={24}>
        Đăng nhập hoặc đăng ký
      </Text>
      <View style={styles.textInput}>
        <TextInputOutLine
          label="Số điện thoại"
          style={styles.txtInput}
          value={phone}
          onChangeText={(outlinedLargeText) => {
            setPhone(outlinedLargeText);
          }}
        />
      </View>
      <Button
        style={styles.btnLogin}
        title="Bắt đầu"
        titleColor="#FFFFFF"
        onPress={validationLogin}
      />
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
      <Spinner visible={loading} textStyle={{color: '#FFF'}} />
    </View>
  );
}
