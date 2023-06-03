import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import EmptyyourfridgeHeader from "../Components/EmptyyourfridgeHeader";
import CloseIcon from "../assets/closeIcon.png";
import { apiClient } from "../Utils/AxiosInstance";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import ButtonGroupComponent from "../Components/ButtonGroupComponent";
import { getIngredientList } from "../Utils/Utils";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import "./EmptyYourFridge.css";
import { GrDocumentPdf } from "react-icons/gr";
import ToggleButton from "react-bootstrap/ToggleButton";
import Footer from "../Components/Footer/Footer";
import { useParams } from "react-router-dom";

function EmptyYourFridge() {
  const handleOnSearch = (string, results) => { };
  const handleOnHover = (result) => { };

  const [usedIngredients, setUsedIngredients] = useState([]);
  const [currentSelectedInput, setCurrentSelectedInput] = useState("1");

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [SuggestedRecipes, setSuggestedRecipes] = useState([]);

  const [mealType, setMealType] = useState("");
  const [allergies, setAllergies] = useState("");

  //lagra search input
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchKey, setSearchKey] = useState(0);

  const params = useParams();

  async function fetchIngredientsList() {
    const ingredientsList = await getIngredientList();
    return ingredientsList;
  }

  const [IngredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    fetchIngredientsList().then((ingredientsList) => {
      setIngredientsList(ingredientsList);
    });
  }, []);

  const handleOnFocus = () => { };

  //om en ingrediens redan är vald i selectedIngrediens arrayen så tas den bort med "filter"
  const handleCloseIng = (name) => {
    if (selectedIngredients.includes(name)) {
      const isIngPresent = selectedIngredients.filter((el) => el !== name);
      setSelectedIngredients(isIngPresent);

      // this condition will put the selected checbox value in the state array.
    }
  };
  //Syftet med denna funktion är att hantera urvalet av en ingrediens
  //kontrollerar om selectedIngredients-arrayen redan innehåller namnet på den valda ingrediensen
  //med hjälp av includes, om det finns då händer det ingenting
  //funktionen låter användaren att välja ingredienser och lagrar det inför en sökning
  const handleOnSelect = (item) => {
    if (selectedIngredients.includes(item.name)) {
    } else {
      const getIngData = [...selectedIngredients, item.name];
      setSelectedIngredients(getIngData);
    }
  };
  //Lägger till recipe och ingredients (selectedIngredients) för att räkna antal matchande ingredienser i recept
  // sedan så returnerar vi längden av recepeten som representerar antal matching ingredients.
  const getMatchingIngredientsCount = (recipe, ingredients) => {
    return recipe.usedIngredients.filter((usedIngredient) =>
      ingredients.some((selectedIngredient) =>
        usedIngredient.name
          .toLowerCase()
          .includes(selectedIngredient.toLowerCase())
      )
    ).length;
  };

  //hanterar avalen av ingredienser från rullgardinen fungerar på liknande sett som handleOnSelect
  const handleOnSelectInput = (e) => {
    const item = e.target.value;
    setCurrentSelectedInput(item);
    if (item !== "1") {
      if (selectedIngredients.includes(item)) {
      } else {
        const getIngData = [...selectedIngredients, item];
        setSelectedIngredients(getIngData);
      }
    }
  };

  const newSearch = () => {

    console.log("Searched");
    apiClient
      .get("recipes/complexSearch", {
        params: {
          includeIngredients: selectedIngredients.join(","),
          fillIngredients: true,
          intolerances: allergies,
          type: mealType,
          number: 25,
          sort: "min-missing-ingredients",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSuggestedRecipes(res.data.results);
      });


    // Save the selectedIngredients as usedIngredients before clearing them
    setUsedIngredients(selectedIngredients);

    // rensa selectedIngredients efter sökning
    // setCurrentSelectedInput("1");
    // setSelectedIngredients([]);
    // rensa search bar
    setSearchInputValue("");
    setSearchKey(searchKey + 1);
  };

  const setURL = () => {
    console.log("Setting url");
    window.history.replaceState(null, "New Page Title", "/EmptyYourFridge/ingredients=" + selectedIngredients + "&allergies=" + allergies + "&mealtype=" + mealType);
  }

  const [notFirst, setNotFirst] = useState(false);

  useEffect(() => {

    const queryParams = new URLSearchParams(params.search);
    if (queryParams.has("ingredients")) {
      setSelectedIngredients(queryParams.get("ingredients").split(",").filter(el => el != ""));
    }
    if (queryParams.has("allergies")) {
      setAllergies(queryParams.get("allergies"));
    }
    if (queryParams.has("mealtype")) {
      setMealType(queryParams.get("mealtype"));
    }
  }, []);

  //Söker igen automatiskt när vald ingredients, allergi eller mealtype ändras men lämnar utkommenterad för att spara api calls
  useEffect(() => {

    if (notFirst) {
      setURL();
      newSearch();
    } else {
      setNotFirst(true);
    }
  }, [selectedIngredients, mealType, allergies]);

  return (
    <div>
      <NavigationBar />
      <EmptyyourfridgeHeader />
      <div>
        <ButtonGroupComponent
          setMealType={setMealType}
          setAllergies={setAllergies}
          firstButton={"All"}
        />
        <div className="search-field">
          <ReactSearchAutocomplete
            //hämtar information från ingredientsList
            //dokument finns, googla: npm ReactSearchAutocomplete
            key={searchKey}
            items={IngredientsList}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            maxResults={15}
            placeholder="Search Ingredients"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <div className="button-position">
            <ToggleButton
              variant="light"
              className="btn me-3 rounded-pill border-bottom"
              onClick={newSearch}
            >
              Search
            </ToggleButton>
          </div>
          <div></div>
          <div className="common-dropdown mb-3">
            <select
              className="rounded-pill border h-25 d-none d-sm-block d-md-block"
              placeholder=""
              value={currentSelectedInput}
              onChange={handleOnSelectInput}
            >
              <option value="1">Common Ingredients</option>
              {selectInputIngredients.map((el) => {
                return <option value={el.name}>{el.name}</option>;
              })}
            </select>
          </div>
          <Container className="mr-auto ingredient-buttons-container d-flex">
            <Row className="gy-2 align-items-start">
              {selectedIngredients.map((el) => (
                <Col key={el} xs="auto">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-truncate ingredient-buttons"
                    onClick={() => handleCloseIng(el)}
                  >
                    {el} <img src={CloseIcon} alt="Close icon" />
                  </Button>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <Container className="py-5 recipecards-class">
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-4 gx-3.5 mb-4">
            {SuggestedRecipes?.map((el) => {
              return (
                <div>
                  <div>
                    <Col key={el.id} className="d-flex justify-content-center">
                      <Link
                        to={
                          "/RecipeDetail/" +
                          el.id +
                          "/" +
                          selectedIngredients
                            .map((name) => {
                              const ingredient = IngredientsList.find((ing) => ing.name === name);
                              return ingredient ? ingredient.id : -1;
                            })
                            .filter((id) => id !== -1) // Filter out -1 values
                            .join(",")
                        }
                        state={{ showUsedIngredients: true }}
                      >
                        <Card className="mb-2" style={{ minHeight: "500px" }}>
                          <Card.Img variant="top" src={el.image} />
                          <Card.Body>
                            <Card.Title className="recipecard-title">
                              {el.title}
                            </Card.Title>
                            <hr className="horizontal-line"></hr>
                            <div id={`capture${el.id}`}>
                              <Card.Text>
                                <div className="recipecard-ingredients-info">
                                  Used Ingredients
                                </div>
                                {usedIngredients
                                  .filter((usedIngredient) =>
                                    el.usedIngredients.some(
                                      (recipeIngredient) =>
                                        recipeIngredient.name
                                          .toLowerCase()
                                          .includes(
                                            usedIngredient.toLowerCase()
                                          )
                                    )
                                  )
                                  .map((usedIngredient) => (
                                    <div className="recipecard-used-ingredients">
                                      {usedIngredient}
                                    </div>
                                  ))}
                              </Card.Text>
                              <Card.Text>
                                <div className="recipecard-ingredients-info">
                                  Missing Ingredients
                                </div>
                                {el.missedIngredients
                                  ?.filter(
                                    (el) =>
                                      !selectedIngredients.includes(el.name)
                                  )
                                  .map((el) => (
                                    <div className="recipecard-missing-ingredients">
                                      {el.name}
                                    </div>
                                  ))}
                              </Card.Text>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      style={{ width: "100%", boxShadow: "none" }}
                      variant="light"
                      className="pdf-generate pdf-button"
                      onClick={() =>
                        _exportPdf(
                          `capture${el.id}`,
                          el.title,
                          el.missedIngredients
                        )
                      }
                    >
                      <GrDocumentPdf /> Missing ingredients
                    </Button>
                  </div>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default EmptyYourFridge;

const selectInputIngredients = [
  {
    name: "almonds",
    id: 12061,
  },
  {
    name: "eggs",
    id: 1123,
  },
  {
    name: "apple",
    id: 9003,
  },
  {
    name: "apricots",
    id: 9021,
  },
  {
    name: "avocado",
    id: 9037,
  },
  {
    name: "bacon",
    id: 10123,
  },
];

const _exportPdf = (id, title, missedIngredients) => {
  const input = document.getElementById(id);
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text(20, 20, `The missing ingredients for recipe:\n "${title}"`);
  const ingredients = missedIngredients.map((ingredient, index) => {
    return `${ingredient.amount} ${ingredient.unit} - ${ingredient.name
      }`;
  });
  const lineHeight = 7;

  const startY = 40;
  let y = startY;
  ingredients.forEach((ingredient) => {
    const { width } = pdf.getTextDimensions(ingredient);
    const availableWidth = pdf.internal.pageSize.width - 40;
    if (width <= availableWidth) {
      pdf.text(20, y, ingredient);
      y += lineHeight;
    } else {
      const lines = pdf.splitTextToSize(ingredient, availableWidth);
      lines.forEach((line) => {
        pdf.text(20, y, line);
        y += lineHeight;
      });
    }
  });
  pdf.save(`ingredients-${title}.pdf`);
};
