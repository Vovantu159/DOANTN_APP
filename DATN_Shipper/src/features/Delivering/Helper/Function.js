const {BaseURL} = require('../../../constants/Service');

const getProfile = async (token) => {
  try {
    let response = await fetch(BaseURL + '/driver/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.log('Catch error', error);
  }
};
const completeOder = async (token, oderId) => {
  try {
    let response = await fetch(BaseURL + `/driver/orders/${oderId}/complete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.log('Catch error', error);
  }
};
const calculatorPrice = (arr) => {
  let sum = 0;

  arr.map((e) => {
    sum = sum + e.price * e.quantity;
  });
  return sum;
};

export {getProfile, calculatorPrice, completeOder};
