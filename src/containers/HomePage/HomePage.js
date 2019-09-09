import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_ID } from "../../config";
import { formatCurrency, getErrorMessage } from "../../helpers";
import CurrencyBox from "../../components/CurrencyBox";
import Title from "../../components/Title";
import Spinner from "../../components/Spinner";
import "./styles.css";

const HomePage = () => {
  const [currenciesList, setCurrencyList] = useState([]);
  const [baseValue, setBaseValue] = useState(null);
  const [secondaryValue, setSecondaryValue] = useState(null);
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("https://openexchangerates.org/api/currencies.json")
        .then(response => {
          setCurrencyList(formatCurrency(response.data));
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
      setError(err);
      console.error(err);
    }
  }, []);

  const handleBaseCheck = async base => {
    setIsLoading(true);
    setBaseValue(base);
    setRates(null);
    try {
      const response = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${base.value}`
      );
      setError(null);
      setRates(response.data.rates);
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
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
              onSelect={secondary => setSecondaryValue(secondary)}
            />
          </div>
        </div>
        {isLoading ? <Spinner /> : renderInfo()}
      </div>
    </>
  );
};

export default HomePage;
