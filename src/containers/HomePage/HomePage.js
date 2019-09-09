import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { APP_ID } from "../../config";
import { formatCurrency, getErrorMessage } from "../../helpers";
import CurrencyBox from "../../components/CurrencyBox";
import Title from "../../components/Title";
import Spinner from "../../components/Spinner";
import currencyReducer from "./reducer";
import "./styles.css";

const initialState = {
  currenciesList: [],
  baseValue: null,
  secondaryValue: null,
  rates: null,
  isLoading: true,
  error: false
};

const HomePage = () => {
  const [
    { currenciesList, baseValue, secondaryValue, rates, isLoading, error },
    dispatch
  ] = useReducer(currencyReducer, initialState);

  useEffect(() => {
    try {
      axios
        .get("https://openexchangerates.org/api/currencies.json")
        .then(response => {
          dispatch({
            type: "SET_CURRENCY_LIST",
            currenciesList: formatCurrency(response.data)
          });
        });
    } catch (err) {
      dispatch({
        type: "FETCHING_ERROR",
        error: err
      });
      console.error(err);
    }
  }, []);

  const handleBaseCheck = async base => {
    dispatch({ type: "FETCH_RATES_START", base });
    try {
      const response = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${base.value}`
      );
      dispatch({ type: "FETCH_RATES_SUCCESS", rates: response.data.rates });
    } catch (err) {
      dispatch({
        type: "FETCHING_ERROR",
        error: err.response.data.message
      });
      throw err;
    }
  };

  const renderInfo = () => (
    <>
      {error && <div className="error">{getErrorMessage(error)}</div>}
      {rates && baseValue && secondaryValue ? (
        <div className="info">
          <span className="price">1</span> {baseValue.value} ={" "}
          <span className="price">{rates[secondaryValue.value]}</span>{" "}
          {secondaryValue.value}
        </div>
      ) : (
        <div className="info">Выберите валюты, а я покажу вам свежий курс.</div>
      )}
    </>
  );

  return (
    <>
      <Title>Валютатор</Title>
      <div className="box">
        <div className="container">
          <div className="currencyBox">
            <CurrencyBox
              currencies={currenciesList}
              onSelect={base => handleBaseCheck(base)}
            />
          </div>
          <div className="currencyBox">
            <CurrencyBox
              currencies={currenciesList}
              onSelect={secondary =>
                dispatch({ type: "SET_SECONDARY_VALUE", secondary })
              }
            />
          </div>
        </div>
        {isLoading ? <Spinner /> : renderInfo()}
      </div>
    </>
  );
};

export default HomePage;
