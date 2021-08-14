import React from "react";
const types = require("./types.json");

function Icon(props) {
  const path = types[props.type];
  if (!path) {
    return null;
  }
  return (
    <svg x="0px" y="0px" viewBox="0 0 24 24" style={props.style || null}>
      <path d={path} />
    </svg>
  );
}

export default Icon;
