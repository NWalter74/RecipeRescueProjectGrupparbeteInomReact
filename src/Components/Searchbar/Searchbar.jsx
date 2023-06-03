import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Searchbar.css";

function Searchbar(props) {
  //state för att hålla koll på vad användaren skriver i searchbar
  const [searchQuery, setSearchQuery] = useState("");

  // sätter värde för query när användaren trycker på sök knappen
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setQuery(searchQuery);
    console.log(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container fluid className="search-container">
      <Row>
        <Col xs={9} md={7} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit} className="d-flex">
            <FormControl
              onChange={handleChange}
              type="text"
              placeholder="Search for recipe..."
              className="mr-2 flex-grow-1"
            />
            <Button type="submit" className="hover-effect" variant="outline">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Searchbar;
