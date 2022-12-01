import {BaseURL} from '../../../constants/ApiConnection';
const getListComplete = async (token, page) => {
  try {
    let response = await fetch(BaseURL + `/orders/completed?page=${page}`, {
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

export {getListComplete};
