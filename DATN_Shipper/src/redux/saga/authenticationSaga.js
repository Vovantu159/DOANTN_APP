import {createSliceSaga, SagaType} from 'redux-toolkit-saga';
import {put, call} from 'redux-saga/effects';
import {flowRequest} from '../service/FlowRequest';
import * as authReducer from '../reducers/authenticationSlice';
import {BaseURL} from '../../constants/Service';
import {Alert} from 'react-native';
import {navigate} from '../../navigation/navigationService';
const slice = createSliceSaga({
  name: 'authSaga',
  sagaType: SagaType.TakeLatest,
  caseSagas: {
    *signIn(action) {
      yield console.log('Sigin', action);
      yield put(authReducer.signIn());
      yield call(
        flowRequest,
        BaseURL + '/driver/login',
        {
          body: JSON.stringify({
            phone_number: action.payload.phoneFormat,
            otp: action.payload.otp,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          method: 'POST',
        },
        {
          200: function* (data) {
            console.log('Success saga login', data);
             yield put(authReducer.signUpSuccess(data));
           navigate('Update');
            yield put(validationProfile(data.data.accessToken));
          },
          422: function* (res) {
            console.log(JSON.stringify({
              phone_number: action.payload.phoneFormat,
              otp: action.payload.otp,
            }));
            console.log('Error', res);
            yield put(authReducer.signInError(res));
            Alert.alert(
              'Lỗi xác thực',
              'Mã OTP không chính xác hoặc đã hết hạn',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );

            // console.log('Tài khoản hoặc mật khẩu không đúng');
          },
        },
        function* (res) {
          yield put(authReducer.signInError(res));
          Alert.alert('Lỗi xác thực', 'Hệ thống đang bảo trì', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log('Có lỗi xảy ra, vui lòng thực hiện lại!');
        },
      );
    },
    *validationProfile(action) {
      yield call(
        flowRequest,
        BaseURL + '/driver/profile',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + action.payload,
          },
          method: 'GET',
        },
        {
          200: function* (data) {
            console.log('validate', data);
            yield put(
              authReducer.signInSuccess({
                token: action.payload,
                profile: data.data.profile,
              }),
            );
          },
          422: function* (res) {
            console.log('Error', res);
            yield put(authReducer.signInError(res));
            Alert.alert(
              'Lỗi xác thực',
              'Tài khoản chưa được cập nhật thông tin',
              [{text: 'Cập nhật', onPress: () => navigate('PhoneVerify')}],
            );

            // console.log('Tài khoản hoặc mật khẩu không đúng');
          },
        },
        function* (res) {
          yield put(authReducer.signInError(res));
          Alert.alert('Lỗi xác thực', 'Hệ thống đang bảo trì', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log('Có lỗi xảy ra, vui lòng thực hiện lại!');
        },
      );
    },
    *signInError(action) {
      yield console.log('Sigin error', action);
    },
    *signUp(action) {
      yield console.log('Sign up', action);
      yield put(authReducer.signUp());
      yield call(
        flowRequest,
        BaseURL + '/driver/register',
        {
          body: JSON.stringify({
            phone_number: action.payload.phoneFormat,
            otp: action.payload.otp,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          method: 'POST',
        },
        {
          200: function* (data) {
            console.log('Success saga signup', data);
            yield put(authReducer.signUpSuccess(data));
            navigate('Update', {phone: action.payload.phoneFormat});
          },
          422: function* (res) {
            console.log('Error', res);
            yield put(authReducer.signUpError(res));
            Alert.alert(
              'Lỗi xác thực',
              'Mã OTP không chính xác hoặc đã hết hạn',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );

            // console.log('Tài khoản hoặc mật khẩu không đúng');
          },
        },
        function* (res) {
          yield put(authReducer.signUpError(res));
          Alert.alert('Lỗi xác thực', 'Hệ thống đang bảo trì', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log('Có lỗi xảy ra, vui lòng thực hiện lại!');
        },
      );
    },
    *signUpSuccess(action) {
      yield console.log('Sign up', action);
    },
    *signUpError(action) {
      yield console.log('Sign up', action);
    },
  },
});
const authSaga = slice.saga;
export default authSaga;
export const {
  signIn,
  validationProfile,
  signInError,
  signUp,
  signUpSuccess,
  signUpError,
} = slice.actions;
