const {BaseURL} = require('../../constants/Service');

const registerTokenFCM = async (token, fcmToken) => {
  try {
    let response = await fetch(BaseURL + '/driver/fcm/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        fcm_token: fcmToken,
      }),
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
const removeTokenFCM = async (token) => {
  try {
    let response = await fetch(BaseURL + '', {
      method: 'DELETE',
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
export {registerTokenFCM, removeTokenFCM};
