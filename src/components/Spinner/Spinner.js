import React from "react";
import spin from "./spin.svg";
import "./styles.css";

const Spinner = () => (
  <div className="spin">
    <img src={spin} alt="Загрузка"/>
  </div>
);

export default Spinner;
