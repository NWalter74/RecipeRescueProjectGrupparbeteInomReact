import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import {
  Button,
  ListGroup,
  Card,
  Container,
  Row,
  Col,
  ListGroupItem,
} from "react-bootstrap";
import "./RecipeDetail.css";
import jsPDF from "jspdf";
import Footer from "../Components/Footer/Footer";
import { apiClient } from "../Utils/AxiosInstance";

function RecipeDetail() {
  const [data, setData] = useState(null);
  const params = useParams();
  const [recipe, setRecipe] = useState(null);
  const [useMetric, setUseMetric] = useState(true);

  const [ingredientState, setIngredientState] = useState([]);
  const [ingredientStateString, setIngredientStringState] = useState([]);

  const _exportPdf = (id, title, missedIngredients) => {
    const input = document.getElementById(id);
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(20, 20, `The missing ingredients for recipe:\n "${title}"`);
    const ingredients = missedIngredients.map((ingredient) => {
      return `${ingredient.amount} ${useMetric ? ingredient.measures.metric.unitShort : ingredient.measures.us.unitShort} - ${ingredient.name
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

  useEffect(() => {
    apiClient.get("/recipes/" + params.recipeId + "/information")
      .then((res) => setData(res.data));

    if (params.ingredientIds != null) {
      const haveIngredientsStringIds = params.ingredientIds.split(",");
      const haveIngredientsIds = haveIngredientsStringIds.map((s) =>
        parseInt(s)
      );

      setIngredientState(haveIngredientsIds);
      setIngredientStringState(haveIngredientsStringIds);
    }
  }, []);

  const changeIngredient = (ing) => {
    if (ingredientStateString.includes(ing.name)) {
      setIngredientStringState(
        ingredientStateString.filter((name) => name !== ing.name)
      );
    } else if (ingredientState.includes(ing.id)) {
      setIngredientState(ingredientState.filter((id) => id !== ing.id));
    } else {
      setIngredientState([...ingredientState, ing.id]);
    }
    console.log(ing.measures.metric);
  };

  let ingredientList = [];
  let ingredients = null;
  let instructions = [<p>Could not retrieve instructions</p>];

  if (data != null) {
    ingredients = data.extendedIngredients;

    ingredientList = ingredients.map((ing) => (
      <ListGroup>
        <Button
          onClick={() => changeIngredient(ing)}
          key={ing.id}
          style={{ width: "100%", boxShadow: "none" }}
          variant="light"
          className=
          {`${ingredientState.includes(ing.id) || ingredientStateString.includes(ing.name) ? "text-success" : "text-danger"} ingredient-buttons`}
        >
          &#8226;
          {useMetric
            ? " " +
            ing.measures.metric.amount +
            " " +
            ing.measures.metric.unitShort
            : ing.measures.us.amount + " " + ing.measures.us.unitShort}{" "}
          {ing.name}
        </Button>
      </ListGroup>
    ));

    if (
      data.analyzedInstructions != null &&
      data.analyzedInstructions.length > 0
    ) {
      instructions = data.analyzedInstructions.map((aI) => (
        <div>
          <h5>{aI.name}</h5>

          {aI.steps.map((s) => (
            <ListGroupItem>
              {s.number}. {s.step}
            </ListGroupItem>
          ))}
        </div>
      ));
    }
  }

  if (data != null) {
    return (
      <>
        <NavigationBar />
        <Container className="my-4" style={{ maxWidth: "750px" }}>
          <Row>
            <Col>
              <Card className="mx-auto">
                <Card.Img variant="top" src={data.image} />
                <Card.Body>
                  <Card.Title className="recipe-detail-title">
                    {data.title}
                    <hr></hr>
                  </Card.Title>
                  <Card.Text
                    className="recipe-detail-text"
                    dangerouslySetInnerHTML={{ __html: data.summary }}
                  ></Card.Text>
                </Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <ListGroup>
                      <ListGroup.Item className="ingredients-title d-flex justify-content-between ">
                        <div>
                          <Button
                            className="metric-button"
                            variant="light"
                            onClick={() => setUseMetric(!useMetric)}
                            size="sm"
                          >
                            {useMetric ? "Metric" : "US"}
                          </Button>
                        </div>
                        <div>
                          <span className="ingredients-title">Ingredients</span>
                        </div>
                        <div></div>
                      </ListGroup.Item>
                      {ingredientList}
                    </ListGroup>
                    <Button style={{ width: "100%", boxShadow: "none" }} variant="light" className="pdf-generate pdf-button" onClick={() =>
                      _exportPdf(
                        `capture${data.id}`,
                        data.title,
                        //Filtrerar bort ingredienser från ingredients baserat på vilka som ligger i ingredientState.
                        //PROBLEM ingredienser som man har från url:en men inte med via id utan istället namnet (/butter istället för /1001) filtreras ej ut.
                        //Tror dock det inte är värt att försöka fixa utan snarar så kanse support 
                        //för ingrediensnamn i url kanske ska tas bort då det aldrig används inom hemsidan utan snarare är något användare får fylla i själva.  
                        ingredients.filter(function (ing) { if (!ingredientState.includes(ing.id)) { return true; } }),
                      )
                    }
                    >Generate PDF </Button>
                  </ListGroup.Item>

                  <ListGroup.Item className=" d-flex justify-content-center flex-column align-items-center">
                    <div>
                      <ListGroup className="recipe-detail-text">
                        <div className="d-flex justify-content-center ingredients-title">
                          Instructions
                        </div>
                        {instructions}
                      </ListGroup>
                    </div>
                    <div>
                      <Button
                        href={data.sourceUrl}
                        variant="light"
                        target="_blank"
                        className="recipe-detail-text read-button"
                        size="sm"
                      >
                        Read more
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </>
    );
  } else {
    return (
      <div>
        <h1>Recipe not found</h1>
        <button onClick={() => console.log(data)}>Test</button>
        <Footer></Footer>
      </div>
    );
  }
}

export default RecipeDetail;
