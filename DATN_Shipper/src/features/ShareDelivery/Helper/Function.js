const {BaseURL} = require('../../../constants/Service');

const search = async (token, value) => {
  console.log('phone', value);
  console.log('token', token);
  try {
    let response = await fetch(BaseURL + '/driver/finding', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      body: JSON.stringify({
        phone_number: value,
      }),
    });

    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.log('Find error', error);
  }
};
const addGroups = async (token, id) => {
  try {
    let response = await fetch(BaseURL + '/driver/sharing-group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      body: JSON.stringify({
        driver_id: id,
      }),
    });

    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.log('GET OTO ERROR', error);
  }
};
const getGroups = async (token) => {
  try {
    let response = await fetch(BaseURL + '/driver/sharing-group', {
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
    console.log('GET OTO ERROR', error);
  }
};
const shareOder = async (token, oderId, driver_id) => {
  console.log('Share oder running oderId', oderId);
  console.log('Share oder running driver', driver_id);
  try {
    let response = await fetch(
      BaseURL + `/driver/orders/${oderId}/drivers/sharing`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          driver_id: driver_id,
        }),
      },
    );
    let responseJson = await response.json();
    return {
      status: response.status,
      resJson: responseJson,
    };
  } catch (error) {
    console.log('Catch error', error);
  }
};
export {search, addGroups, getGroups, shareOder};
