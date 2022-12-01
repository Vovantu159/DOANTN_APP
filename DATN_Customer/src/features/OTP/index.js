import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {styles} from './styles';
import {BackIcon} from '../../assets/svg/Svg';
import {Button, Text} from '../../components';
import {scale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import Images from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {register, signIn} from '../../redux/saga/authSaga';
import Spinner from 'react-native-loading-spinner-overlay';
import {sigIn, signOut} from '../../redux/reducers/authenSlice';
export default function VerifiOTP({props, navigation, route}) {
  const {key, phone} = route?.params;
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();
  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const [otp, setotp] = useState('');
  const OTP_LENGTH = [otp1, otp2, otp3, otp4];
  const [isModalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(10);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        return setTime(time - 1);
      }
      return null;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);
  const onBackdropPress = () => {
    setModalVisible(false);
  };
  const confirmSendOTP = () => {
    setModalVisible(false);
    setTime(10);
  };
  useEffect(() => {
    otp1.current.focus();
  }, []);
  const autoNextFocus = (value, ref) => {
    if (value.length === 1) {
      setotp((otp) => otp + value);
      ref?.current?.focus();
    }
    return;
  };
  const veriOTP = () => {
    if (key === 'SignIn') {
      dispatch(signIn({phone, otp}));
    }
    if (key === 'SignUp') {
      console.log('Call api register otp');
      dispatch(
        register({
          phone,
          otp,
        }),
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView behavior="position">
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={Images.img.otp} />
          </View>
          <Text fontSize={scale(24)} style={styles.title}>
            Xác thực tài khoản
          </Text>
          <Text fontSize={scale(12)} style={styles.content} numberOfLines={2}>
            Vui lòng nhập 04 mã số vừa được hệ thống gửi vào số điện thoại của
            bạn
          </Text>
          <View style={styles.inPutOTP}>
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
          {/* <Spinner visible={loading} textStyle={styles.spinnerTextStyle} /> */}
          <View style={styles.btn}>
            <Button
              title="Xác thực"
              onPress={veriOTP}
              titleColor={colors.white_background}
            />
          </View>
          <View style={styles.btn}>
            {time === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{textDecorationLine: 'underline'}} fontSize={14}>
                  Gửi lại
                </Text>
              </TouchableOpacity>
            ) : (
              <Text fontSize={14}>Gửi lại sau {time}</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
