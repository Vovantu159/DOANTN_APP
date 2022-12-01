import {BaseURL} from '../../constants/ApiConnection';
const registerTokenFCM = async (token, fcmToken) => {
  try {
    let response = await fetch(BaseURL + '/fcm/token', {
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
export {registerTokenFCM};
