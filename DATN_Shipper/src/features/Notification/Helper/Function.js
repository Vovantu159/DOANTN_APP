const {BaseURL} = require('../../../constants/Service');

const getNotificationList = async (token) => {
  try {
    let response = await fetch(BaseURL + '/driver/notifications', {
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
export {getNotificationList};
