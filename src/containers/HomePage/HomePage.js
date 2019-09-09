import React, { useState } from "react";
import CurrencyBox from "../../components/CurrencyBox";
import Title from "../../components/Title";
import "./styles.css";

const HomePage = () => {
  const [currenciesList, setCurrencyList] = useState([]);

  return (
    <>
    <Title>Валютатор</Title>
    <div className="box">
      <div className="currencyBox">
        <CurrencyBox currencies={currenciesList} className="currencyBoxContent" />
        <div className="info">Текущий курс: 12.55</div>
      </div>
      <div className="currencyBox">
        <CurrencyBox currencies={currenciesList} className="currencyBoxContent" />
        <div className="info">Текущий курс: 12.55</div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
