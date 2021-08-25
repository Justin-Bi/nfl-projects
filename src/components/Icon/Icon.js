import React from "react";
const types = require("./types.json");

function Icon(props) {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox={props.viewBox || "0 0 24 24"}
      style={props.style || null}
      id={props.id || null}
    >
      <path d={types[props.type] || null} />
    </svg>
  );
}

export default Icon;
