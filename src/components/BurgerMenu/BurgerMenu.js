import React, { useState } from "react";
import "./BurgerMenu.scss";
import Icon from "../Icon";

function BurgerMenu() {
  const [menuHidden, setMenuHidden] = useState(true);

  return (
    <div className="burger-menu-container">
      <div
        className="burger-menu-button"
        onClick={() => {
          setMenuHidden(!menuHidden);
        }}
      >
        <Icon type="BurgerMenu" id="burger-menu-icon" />
      </div>
      <div
        className={`burger-menu-background${
          !menuHidden ? " burger-menu-background-active" : ""
        }`}
        onClick={() => {
          setMenuHidden(true);
        }}
      ></div>
      <div
        className={`burger-menu-sidebar ${
          menuHidden ? "sidebar-hidden" : "sidebar-visible"
        }`}
      >
        {/* <div
          className="burger-menu-close-button"
          onClick={() => {
            setMenuHidden(!menuHidden);
          }}
        >
          <Icon type="GitHub" />
        </div> */}
        <p>Hello</p>
      </div>
    </div>
  );
}

export default BurgerMenu;
