import React from "react";
import PropTypes from "prop-types";

const Title = ({ type, children }) => {
  switch(type) {
    case "h2":
      return <h2>{children}</h2>
    case "h3":
      return <h3>{children}</h3>
    case "h4":
      return <h4>{children}</h4>
    case "h5":
      return <h5>{children}</h5>
    default:
      return <h1>{children}</h1>
  }
}

Title.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
}

Title.defaultProps = {
  currencies: [],
}

export default Title;