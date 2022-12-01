import {BaseURL} from '../../../constants/ApiConnection';
const createOder = async (
  token,
  from_address,
  to_address,
  items,
  user_note,
  receiver,
) => {
  console.log('Body', {from_address, to_address, items, user_note, receiver});
  try {
    let response = await fetch(BaseURL + '/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        from_address: JSON.stringify(from_address),
        to_address: JSON.stringify(to_address),
        items: JSON.stringify(items),
        user_note,
        receiver: JSON.stringify(receiver),
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
const updateProfileApi = async (token, body) => {
  console.log('DEBUG', body);
  try {
    let response = await fetch(BaseURL + '/profile', {
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
export {createOder, updateProfileApi};
