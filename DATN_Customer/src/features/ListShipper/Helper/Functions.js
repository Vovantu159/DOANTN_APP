import {BaseURL} from '../../../constants/ApiConnection';
const getListDriverRecommend = async (token, page, oderId) => {
  try {
    let response = await fetch(
      BaseURL + `/orders/${oderId}/drivers/recommended?page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
};
const addDriverToOder = async (token, driver_id, oderId) => {
  try {
    let response = await fetch(BaseURL + `/orders/${oderId}/drivers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        driver_id,
      }),
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
const addDriverToOderRandom = async (token, oderId) => {
  try {
    let response = await fetch(BaseURL + `/orders/${oderId}/drivers/random`, {
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
    console.error(`Error is : ${error}`);
  }
};
export {getListDriverRecommend, addDriverToOder, addDriverToOderRandom};
