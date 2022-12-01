const {BaseURL} = require('../../../constants/ApiConnection');

const reviewDriver = async (token, oderId, rate) => {
  try {
    let response = await fetch(BaseURL + `/orders/${oderId}/review`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        driver_rate: rate,
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
export {reviewDriver};
