const {BaseURL} = require('../../../constants/ApiConnection');
const getProfile = async (token) => {
  try {
    let response = await fetch(BaseURL + '/profile', {
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
const updatePass = async (token, password, password_cf) => {
  try {
    let response = await fetch(BaseURL + '/password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        password: password,
        password_confirmation: password_cf,
      }),
    });
    return response;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};
const getListInProcess = async (token, page) => {
  try {
    let response = await fetch(BaseURL + `/orders/inproccess?page=${page}`, {
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
    console.error(`Error is : ${error}`);
  }
};
export {getProfile, updatePass, getListInProcess};
