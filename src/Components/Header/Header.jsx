import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import pumpkinImage from "/Image/pumpkin2.jpg";
import "./Header.css";



function Header() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="header">
          <img
          //ändrade src
            src={pumpkinImage}
            alt="Your header description"
            className="img-fluid"
          />
          <div className="header-text">
            Recipe <br /> Rescue
            <div>
              <Link to="/emptyyourfridge">
                <Button variant="light" className="mt-2 mx-2 " size="md">
                  Empty your fridge!
                </Button>
              </Link>
              <HashLink smooth to="#section1">
                <Button variant="light" className="mt-2 mx-2" size="md">
                  Show nearby stores
                </Button>
              </HashLink>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
