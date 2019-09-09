const currencyReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FETCH_RATES_START":
      return {
        ...state,
        isLoading: true,
        baseValue: action.base,
        rates: null
      };
    case "FETCH_RATES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        rates: action.rates
      };
    case "SET_CURRENCY_LIST":
      return {
        ...state,
        currenciesList: action.currenciesList,
        isLoading: false
      };
    case "SET_SECONDARY_VALUE":
      return {
        ...state,
        secondaryValue: action.secondary
      };
    case "FETCHING_ERROR":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default currencyReducer;