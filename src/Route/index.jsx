import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import RecipeDetail from "../Pages/RecipeDetail";
import EmptyYourFridge from "../Pages/EmptyYourFridge";
import AboutUs from "../Pages/AboutUs";

function AppRouting() {
  return (
    <Routes>
      <Route path="/" >
        <Route path="" element={<Home />} />
        <Route path=":search" element={<Home />} />
      </Route>

      <Route path="/RecipeDetail/">
        <Route path=":recipeId" element={<RecipeDetail />} />
        <Route path=":recipeId/:ingredientIds" element={<RecipeDetail />} />
      </Route>
      <Route path="/EmptyYourFridge">
        <Route path="" element={<EmptyYourFridge />} />
        <Route path=":search" element={<EmptyYourFridge />} />
      </Route>
      <Route path="/AboutUs" element={<AboutUs />} />

    </Routes>
  );
}

export default AppRouting;
