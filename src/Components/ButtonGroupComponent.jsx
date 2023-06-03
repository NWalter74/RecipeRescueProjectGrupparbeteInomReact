import {
  MdOutlineFreeBreakfast,
  MdOutlineLunchDining,
  MdOutlineDinnerDining,
  MdOutlineCake,
} from "react-icons/md";

import { AiOutlineStar, AiOutlineFilter } from "react-icons/ai";
import "../index.css";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";

function ButtonGroupComponent(props) {
  // funktion som sätter value för mealType, funktionen anropas varje gång någon av knapparna trycks
  const handleMealTypeChange = (value) => {
    props.setMealType(value);
  };
  //funtion som sätter value för allergies , funktionen anropas varje gång användaren väljer ett nytt filter
  const handleAllergyChange = (value) => {
    props.setAllergies(value);
  };

  const possibleAllergies = [
    "Dairy",
    "Peanut",
    "Soy",
    "Egg",
    "Seafood",
    "Sulfite",
    "Gluten",
    "Sesame",
    "Tree Nut",
    "Grain",
    "Shellfish",
    "Wheat",
  ];

  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const changeAllergy = async (allergy, add) => {
    {
      let changedAllergies;
      if (add) {
        changedAllergies = [...selectedAllergies, allergy];
      } else {
        changedAllergies = selectedAllergies.filter((a) => a !== allergy);
      }
      setSelectedAllergies(changedAllergies);
      handleAllergyChange(changedAllergies.join(","));
    }
  }


  let allergyFilter = (
    possibleAllergies.map(al => (
      <Form.Check
        inline
        label={al}
        type="checkbox"
        value={al}
        onChange={(e) => changeAllergy(e.target.value, e.target.checked)}
        checked={selectedAllergies.includes(al)}
      />
    ))
  );


  const clearAllergies = () => {
    setSelectedAllergies([]);
    handleAllergyChange([].join(","));
  }


  return (
    <Container className="mt-3">
      {/* 
      anropar funtionen handleMealTypeChange när dess value ändras och de är när användaren väljer vilken filter för måltid
       */}
      <Row className="justify-content-center buttongroup">
        <Col>
          <ToggleButtonGroup
            type="radio"
            name="options"
            className="btn-group"
            onChange={handleMealTypeChange}
          >
            <ToggleButton
              id="tbg-radio-4"
              variant="light"
              value={props.firstButton}
              className="btn me-1 rounded-pill border-bottom homepage"
            >
              <AiOutlineStar className="homeIcons" />
              {props.firstButton}
            </ToggleButton>

            <ToggleButton
              id="tbg-radio-1"
              variant="light"
              value={"breakfast"}
              className="btn me-1 rounded-pill border-bottom homepage"
            >
              <MdOutlineFreeBreakfast className="homeIcons" />
              Breakfast
            </ToggleButton>

            <ToggleButton
              id="tbg-radio-2"
              variant="light"
              value={"salad"}
              className="btn me-1 rounded-pill border-bottom homepage"
            >
              <MdOutlineLunchDining className="homeIcons" />
              Lunch
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-3"
              variant="light"
              value={"dinner"}
              className="btn me-1 rounded-pill border-bottom homepage"
            >
              <MdOutlineDinnerDining className="homeIcons" />
              Dinner
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-5"
              variant="light"
              value={"dessert"}
              className="btn me-1 rounded-pill border-bottom homepage"
            >
              <MdOutlineCake className="homeIcons" />
              Dessert
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      {/* 
      anropar funtionen HandleAllergyChange när dess value ändras och de är när användaren väljer vilken filter för allergy
       */}
      <Row className="justify-content-center mt-3">
        <Col lg={10}>
          <Form.Group>
            <Form.Label>
              <AiOutlineFilter />
              Allergies
            </Form.Label>
            <div className="container">
              {allergyFilter}
              <button onClick={clearAllergies} className="btn me-1 rounded-pill border-bottom homepage">Clear</button>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default ButtonGroupComponent;
