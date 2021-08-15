import React from "react";

function Button(props) {
  return (
    <h1 className={`hero-text-${props.size || "large"}`}>{props.children}</h1>
  );
}

export default Button;
