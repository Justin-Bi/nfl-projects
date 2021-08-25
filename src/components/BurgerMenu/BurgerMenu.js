import React, { useState, useEffect } from "react";
import "./BurgerMenu.scss";
import Icon from "../Icon";

import { NavLink } from "react-router-dom";

function BurgerMenu(props) {
  const [menuHidden, setMenuHidden] = useState(true);

  // To prevent scroll when the menu is open
  document.body.style.overflowY = menuHidden ? "" : "hidden";

  // Edge case where screen size changes while hamburger menu is open
  useEffect(() => {
    return function cleanup() {
      document.body.style.overflowY = "";
    };
  }, []);

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
        <div
          className="burger-menu-close-button-div"
          onClick={() => {
            setMenuHidden(!menuHidden);
          }}
        >
          <Icon type="XIcon" id="burger-menu-x-button" />
        </div>
        <div className="bm-links">
          <div className="bm-nav-link-div">
            <NavLink
              activeClassName="active-link"
              className="nav-link bm-nav-link"
              to="/six-degrees"
              onClick={() => {
                setMenuHidden(true);
              }}
            >
              Six Degrees of Separation
            </NavLink>
          </div>
          <div className="bm-nav-link-div">
            <NavLink
              activeClassName="active-link"
              className="nav-link bm-nav-link"
              to="/teammates"
              onClick={() => {
                setMenuHidden(true);
              }}
            >
              Teammates
            </NavLink>
          </div>
          <div className="bm-nav-link-div">
            <NavLink
              activeClassName="active-link"
              className="nav-link bm-nav-link"
              to="/height-and-weight"
              onClick={() => {
                setMenuHidden(true);
              }}
            >
              Height and Weight
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
