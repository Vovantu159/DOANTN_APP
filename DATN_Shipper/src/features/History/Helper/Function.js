// 'status' => [
//     'pending' => 1,
//     'inprocess' => 2,
//     'completed' => 3,
//     'cancled_by_user' => 4,
//     'cancled_by_driver' => 5,
//     'cancled_by_system' => 6,

const {BaseURL} = require('../../../constants/Service');

// ]
const getHistoryList = async (token, from, to, status) => {
  try {
    let response = await fetch(
      BaseURL + `/driver/orders/summary?from=${from}&to=${to}&status=${status}`,
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
    console.log('Catch error', error);
  }
};
const calculatorPrice = (arr) => {
  let sum = 0;
  arr.map((e) => {
    sum = sum + e.price * e.quantity;
  });
  return sum;
};
const calculatorIncome = (arr) => {
  let sum = 0;
  arr.map((e) => {
    sum = sum + e.shipping_cost;
  });
  return sum;
};
export {getHistoryList, calculatorPrice, calculatorIncome};
