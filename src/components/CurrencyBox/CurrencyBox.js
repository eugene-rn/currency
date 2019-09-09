import React from "react";
import "./styles.css";

const CurrencyBox = ({ currencies, className }) => {
  return (
    <div className={className}>
      <input placeholder="Введите название валюты" className="textInput" />
      <div>
        <ul>
          {currencies.map((currency, i) => <li key={i}>{currency}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default CurrencyBox;