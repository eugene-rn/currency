const formatCurrency = currenciesObj => {
  const currenciesArray = [];
  for (let key in currenciesObj) {
    currenciesArray.push({ value: key, info: currenciesObj[key] });
  }
  return currenciesArray;
};

export default formatCurrency;
