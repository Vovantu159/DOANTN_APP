const calculatorPrice = (arr) => {
  let sum = 0;
  arr.map((e) => {
    sum = sum + e.price * e.quantity;
  });
  return sum;
};
export {calculatorPrice};
