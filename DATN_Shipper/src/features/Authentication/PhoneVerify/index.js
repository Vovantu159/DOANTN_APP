import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../Item/Header';
import {Button, SupperAlert} from '../../../components';
import {styles} from './styles';
import {formatPhoneNumber, register} from '../Helper/Function';
import {useDispatch} from 'react-redux';
import {signIn, signUp} from '../../../redux/saga/authenticationSaga';
import Spinner from 'react-native-loading-spinner-overlay';
export default function PhoneVerify({props, navigation, route}) {
  const {key, phone} = route?.params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();
  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const [otp, setotp] = useState('');
  const [time, setTime] = useState(10);
  const [showAler, setshowAler] = useState(false);
  const OTP_LENGTH = [otp1, otp2, otp3, otp4];
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        return setTime(time - 1);
      }
      return null;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);
  useEffect(() => {
    otp1.current.focus();
  }, []);
  const autoNextFocus = (value, ref) => {
    if (value.length === 1) {
      setotp(otp + value);
      ref?.current?.focus();
    }
    return;
  };
  const close = useCallback(() => {
    setTime(10);
    setshowAler(false);
  }, []);
  const veriOTP = () => {
    setLoading(true);
    const phoneFormat = formatPhoneNumber(phone);
    if (key === 'SignIn') {
      setLoading(false);
      dispatch(signIn({phoneFormat, otp}));
    }
    if (key === 'SignUp') {
      setLoading(false);
      dispatch(signUp({phoneFormat, otp}));
    }
  };
  console.log(key);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Xác thực số điện thoại"
        content="Vui lòng nhập mã OTP vừa được  gửi đến số điện thoại của bạn."
      />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <View style={styles.input}>
            {OTP_LENGTH.map((e, index) => (
              <TextInput
                key={index}
                ref={e}
                maxLength={1}
                returnKeyType={index === 3 ? 'done' : 'next'}
                placeholder="-"
                style={styles.textInput}
                onSubmitEditing={() => {
                  if (index < OTP_LENGTH.length - 1) {
                    OTP_LENGTH[index + 1]?.current?.focus();
                  }
                  return;
                }}
                onChangeText={(text) => {
                  if (index <= OTP_LENGTH.length - 1) {
                    autoNextFocus(text, OTP_LENGTH[index + 1]);
                  }
                  return;
                }}
              />
            ))}
          </View>
          <View style={styles.btn}>
            <Button
              title="XÁC THỰC"
              onPress={veriOTP}
              // onPress={() => {
              //   navigation.navigate('Update');
              // }}
            />
          </View>
          <View style={styles.btn}>
            {time === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  ref.current.openModal();
                }}>
                <Text fontSize={14}>Gửi lại</Text>
              </TouchableOpacity>
            ) : (
              <Text fontSize={14}>Gửi lại sau {time}</Text>
            )}
          </View>
          <SupperAlert
            isSucces={true}
            ref={ref}
            title="Thành công"
            message="Mã OTP đã được gửi"
            onClose={close}
          />
        </View>
      </TouchableWithoutFeedback>
      <Spinner visible={loading} textStyle={{color: '#FFF'}} />
    </View>
  );
}
