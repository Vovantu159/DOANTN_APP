import {createSliceSaga, SagaType} from 'redux-toolkit-saga';
import {put, call} from 'redux-saga/effects';
import {flowRequest} from './FlowRequest';
import * as authReducer from '../reducers/authenSlice';
import {BaseURL} from '../../constants/ApiConnection';
import {formatPhoneNumber} from '../../features/Authentication/Helper/Functions';
import {Alert} from 'react-native';

const slice = createSliceSaga({
  name: 'authSaga',
  sagaType: SagaType.TakeLatest,
  caseSagas: {
    *signIn(action) {
      const body = {
        phone_number: formatPhoneNumber(action.payload.phone),
        otp: action.payload.otp,
      };
      yield put(authReducer.signIn());
      yield call(
        flowRequest,
        BaseURL + '/login',
        {
          body: JSON.stringify(body),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          method: 'POST',
        },
        {
          200: function* (data) {
            yield put(authReducer.signInSuccess(data));
            // navigationServices.replace('Main');
          },
          422: function* (res) {
            // yield put(authReducer.signInError(res));
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
      yield console.log('Sigin', action);
    },
    *sigInSuccess(action) {
      yield console.log('Sigin success', action);
    },
    *sigInError(action) {
      yield console.log('Sigin error', action);
    },
    *register(action) {
      const body = {
        phone_number: formatPhoneNumber(action.payload.phone),
        otp: action.payload.otp,
      };
      console.log('otp', action.payload.otp);
      yield put(authReducer.register());
      yield call(
        flowRequest,
        BaseURL + '/register',
        {
          body: JSON.stringify(body),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          method: 'POST',
        },
        {
          200: function* (data) {
            yield put(authReducer.registerSuccess(data));
          },
          422: function* (res) {
            yield put(authReducer.registerError(res));
            Alert.alert(
              'Lỗi xác thực',
              'Mã OTP không chính xác hoặc đã hết hạn',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );

            // console.log('Tài khoản hoặc mật khẩu không đúng');
          },
        },
        function* (res) {
          console.log(res);
          yield put(authReducer.registerError(res));
          Alert.alert('Lỗi xác thực', 'Hệ thống đang bảo trì', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log('Có lỗi xảy ra, vui lòng thực hiện lại!');
        },
      );
    },
    *registerSuccess(action) {
      yield console.log('Register success', action);
    },
    *registerError(action) {
      yield console.log('Register error', action);
    },
  },
});
const authSaga = slice.saga;
export default authSaga;
export const {
  signIn,
  sigInSuccess,
  sigInError,
  registerSuccess,
  registerError,
  register,
} = slice.actions;
