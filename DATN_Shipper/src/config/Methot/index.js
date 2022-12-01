import {BaseURL} from '../../constants';
async function Method_Get(token, paramUrl) {
  try {
    let response = await fetch(BaseURL + paramUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function Method_Post(paramBody, paramUrl) {
  try {
    let response = await fetch(BaseURL + paramUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramBody),
    });
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function Method_Put(token, paramBody, paramUrl) {
  try {
    let response = await fetch(BaseURL + paramUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramBody),
    });
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function Method_Delete(token, paramBody, paramUrl) {
  try {
    let response = await fetch(BaseURL + paramUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramBody),
    });
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
export {Method_Get, Method_Post, Method_Put, Method_Delete};
