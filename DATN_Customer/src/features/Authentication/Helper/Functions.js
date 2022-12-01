const {Method_Post} = require('../../../config/Api');

import {BaseURL} from '../../../constants/ApiConnection';

const loginOTP = async (body) => {
  console.log('Lay otp');
  try {
    let response = await fetch(BaseURL + '/login/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: body,
      }),
    });
    return response;
  } catch (error) {
    console.log('GET OTO ERROR', error);
  }
};
const registerOTP = async (phone) => {
  console.log('body register', phone);
  try {
    let response = await fetch(BaseURL + '/register/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone,
      }),
    });
    // let responseJSON = await response.json();
    return response;
  } catch (error) {
    console.log('GET OTO ERROR', error);
  }
};
const register = async (body) => {
  console.log('body', body);
  try {
    let response = await fetch(BaseURL + '/register/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({body}),
    });
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('GET OTO ERROR', error);
  }
};
const loginPassword = async (phone, pass) => {
  console.log('dm', phone, pass);
  try {
    let response = await fetch(BaseURL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone,
        password: pass,
      }),
    });
    let responseJSON = await response.json();
    console.log('Debug', responseJSON);
    return responseJSON;
  } catch (error) {
    console.log('Error', error);
  }
};
const formatPhoneNumber = (phone) => {
  let a = phone.substr(0, 1);
  a = '+84';
  let b = phone.substr(1);
  return `${a}${b}`;
};
export {loginOTP, registerOTP, formatPhoneNumber, register, loginPassword};
