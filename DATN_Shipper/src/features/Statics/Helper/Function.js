const calculatorDistance = (arr) => {
  let sum = 0;
  if (Array.isArray(arr)) {
    arr.map((e) => {
      sum = sum + e.distance;
    });
  }
  return sum;
};
export {calculatorDistance};
