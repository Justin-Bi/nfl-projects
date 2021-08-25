import React from "react";
import "./NavBar.scss";

import BurgerMenu from "../BurgerMenu";
import { useMediaPredicate } from "react-media-hook";

import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function NavBar() {
  const isBootSm = !useMediaPredicate("(min-width: 768px)"); // < 768px

  return (
    <div className="nav-bar">
      <Container>
        <Row>
          <Col xs={8} sm={9} md={3} lg={4} className="home-link-group">
            <NavLink className="nav-link home-link" to="/">
              <span className="home-link-text">NFL Projects</span>
            </NavLink>
          </Col>
          <Col xs={4} sm={3} md={9} lg={8} id="nav-bar-links">
            {!isBootSm && (
              <div id="nav-link-group">
                <NavLink
                  activeClassName="active-link"
                  className="nav-link"
                  to="/six-degrees"
                >
                  Six Degrees of Separation
                </NavLink>
                <NavLink
                  activeClassName="active-link"
                  className="nav-link"
                  to="/teammates"
                >
                  Teammates
                </NavLink>
                <NavLink
                  activeClassName="active-link"
                  className="nav-link"
                  to="/height-and-weight"
                >
                  Height and Weight
                </NavLink>
              </div>
            )}
            {isBootSm && <BurgerMenu></BurgerMenu>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBar;
