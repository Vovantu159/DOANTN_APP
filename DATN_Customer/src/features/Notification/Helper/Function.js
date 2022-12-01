import {BaseURL} from '../../../constants/ApiConnection';
const getNotification = async (token) => {
  try {
    let response = await fetch(BaseURL + '/notifications', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return {
      status: response.status,
      resJSON: responseJson,
    };
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};
export {getNotification};
