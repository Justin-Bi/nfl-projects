import React from "react";
const types = require("./types.json");

function Icon(props) {
  // const tempPath = types[props.type];
  // console.log(tempPath.getBoundingClientRect());
  return (
    <svg
      x="0px"
      y="0px"
      viewBox={props.viewBox || "0 0 24 24"}
      style={props.style || null}
    >
      <path d={types[props.type] || null} />
    </svg>
  );
}

export default Icon;
