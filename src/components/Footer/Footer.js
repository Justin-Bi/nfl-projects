import React from "react";
import "./Footer.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="footer-col" lg={{ span: 4, offset: 2 }}>
            Col 2
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
