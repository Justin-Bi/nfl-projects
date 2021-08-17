import React from "react";
import "./Spinner.scss";

function Spinner(props) {
  return (
    <span
      className={props.type || "default-spinner"}
      style={{ width: props.width || "32px", height: props.height || "32px" }}
    />
  );
}

export default Spinner;
