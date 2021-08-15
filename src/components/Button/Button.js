import React from "react";
import "./Button.scss";

function Button(props) {
  return (
    <input
      className="jb-button"
      type={props.type || "button"}
      value={props.value}
      disabled={props.disabled || false}
    />
  );
}

export default Button;
