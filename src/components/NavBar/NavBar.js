import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function NavBar() {
  return (
    <div className="nav-bar">
      <Container>
        <Row>
          <Col sm={0} md={0} lg={4}>
            {/* To be filled with logo and Title/Homepage later */}
          </Col>
          <Col sm={12} md={12} lg={8}>
            <div id="nav-link-group">
              <Link className="nav-link" to="/six-degrees">
                <span className="nav-link-text">Six Degrees of Separation</span>
              </Link>
              <Link className="nav-link" to="/teammates">
                <span className="nav-link-text">Teammates</span>
              </Link>
              <Link className="nav-link" to="/height-and-weight">
                <span className="nav-link-text">Height and Weight</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBar;
