const {BaseURL} = require('../../../constants/Service');

const loginOTP = async (body) => {
  console.log('Lay otp', body);
  try {
    let response = await fetch(BaseURL + '/driver/login/otp', {
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
const registerOTP = async (body) => {
  try {
    let response = await fetch(BaseURL + '/driver/register/otp', {
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
const register = async (phone, otp) => {
  console.log(phone);
  console.log(otp);

  try {
    let response = await fetch(BaseURL + '/driver/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone,
        otp: otp,
      }),
    });
    let responseJSON = await response.json();
    return {
      status: response.status,
      resJson: responseJSON,
    };
  } catch (error) {
    console.log('Register', error);
  }
};
const upDateInfo = async (token, body) => {
  try {
    let response = await fetch(BaseURL + '/driver/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};

const formatPhoneNumber = (phone) => {
  let a = phone.substr(0, 1);
  a = '+84';
  let b = phone.substr(1);
  return `${a}${b}`;
};
export {loginOTP, formatPhoneNumber, registerOTP, register, upDateInfo};
