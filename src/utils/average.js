export const average = (arr, decimalPlaces = 2) => {
  if (arr.length === 0) {
    return 0;
  }
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  const avg = sum / arr.length;
  return parseFloat(avg.toFixed(decimalPlaces));
};
