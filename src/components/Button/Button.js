import React from "react";
import "./Button.scss";

function Button(props) {
  return (
    <input
      className="jb-button"
      type={props.submit ? "submit" : null}
      value={props.value}
    />
  );
}

export default Button;
