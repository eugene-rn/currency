import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./styles.css";

const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`;
};

const CurrencyBox = ({ currencies, onSelect }) => {
  const [value, setValue] = useState("");
  const [isFocus, toggleFocus] = useState(false);

  return (
    <div className="currencyBoxContent">
      <input
        placeholder="Введите название валюты"
        className="textInput"
        onFocus={() => toggleFocus(true)}
        onBlur={() => toggleFocus(false)}
        onChange={({ target: { value } }) => setValue(value)}
        value={value}
      />
      {isFocus && (
        <div className="listContainer">
          <ul className="list">
            {currencies.filter(elem => elem.value.toLowerCase().includes(value.toLowerCase())).map(currency => (
              <li
                key={generateKey(currency.value)}
                className="item"
                onMouseDown={() => {
                  onSelect(currency);
                  setValue(currency.value)
                  toggleFocus(false);
                }}
              >
                {currency.value} - {currency.info}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CurrencyBox.propTypes = {
  currencies: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
}

CurrencyBox.defaultProps = {
  currencies: [],
}

export default CurrencyBox;
