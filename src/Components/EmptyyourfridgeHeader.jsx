import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.css";
import pumpkinImage from "/Image/pumpkin.jpg";

function EmptyyourfridgeHeader() {
  return (
    <Container fluid>
    <Row>
      <Col xs={12} className="header">
        <img
            src={pumpkinImage}
          alt="Your header description"
          className="img-fluid"
        />
        <div className="header-text">
        <span className="first">Empty</span> 
          <br /> 
         Your
          <br /> 
          <span className="last">Fridge</span>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default EmptyyourfridgeHeader