import React from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function NavBar() {
  return (
    <div className="nav-bar">
      <Container>
        <Row>
          <Col sm={0} md={3} lg={4} className="home-link-group">
            <NavLink className="nav-link home-link" to="/">
              <span className="home-link-text">NFL Projects</span>
            </NavLink>
          </Col>
          <Col sm={12} md={9} lg={8}>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBar;
