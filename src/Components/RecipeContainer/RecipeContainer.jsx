import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./RecipeContainer.css";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function RecipeContainer(props) {
  const [title, setTitle] = useState("Popular Recipes");

  useEffect(() => {
    if (props.mealType !== "") {
      setTitle(
        props.mealType.charAt(0).toUpperCase() +
          props.mealType.slice(1) +
          " Recipes"
      );
      if (props.mealType === "salad") {
        setTitle("Lunch Recipes");
      }
    } else {
      setTitle("Popular Recipes");
    }
  }, [props.mealType]);

  return (
    <>
      {props.data.length > 0 ? (
        <Container className="recipe-container">
          <h1 className="popular-title">{title}</h1>

          <Splide
            options={{
              type: "slide",
              perPage: 4,
              perMove: 1,
              gap: "1rem",
              drag: true,
              dragFree: true,
              pagination: false,
              breakpoints: {
                992: {
                  perPage: 3,
                },
                768: {
                  perPage: 2,
                },
                576: {
                  perPage: 1,
                },
              },
            }}
          >
            {props.data.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Link to={"/RecipeDetail/" + recipe.id + "/information"}>
                  <div className="recipe-card">
                    <img src={recipe.image} alt="" />
                    <div className="recipe-title">{recipe.title}</div>
                  </div>
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        </Container>
      ) : (
        <p className="d-flex justify-content-center">No recipes found.</p>
      )}
    </>
  );
}
