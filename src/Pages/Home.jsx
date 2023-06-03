import React from "react";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import Header from "../Components/Header/Header";
import Searchbar from "../Components/Searchbar/Searchbar";
import ButtonGroupFunction from "../Components/ButtonGroupComponent";
import RecipeContainer from "../Components/RecipeContainer/RecipeContainer";
import { useState, useEffect } from "react";
import { apiClient } from "../Utils/AxiosInstance";
import Map from "../Components/Map";
import Footer from "../Components/Footer/Footer";
import { useParams } from "react-router-dom";

function Home() {
  // useState hooks för att hantera  olika states som vi med input av användaren, använder  som parametrar när vi fetchar data från api och för att lagra data när vi fetchar
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mealType, setMealType] = useState("");
  const [allergies, setAllergies] = useState("");

  const params = useParams();

  const searchRecipes = async () => {
    try {
      console.log(query);
      console.log(mealType);
      console.log(allergies);
      //  funktion för att fetcha recept med olika parametrar och lagrar sedan i state hooken "results"
      const response = await apiClient.get("recipes/complexSearch", {
        params: {
          query: query,
          number: 10,
          type: mealType,
          intolerances: allergies,
        },
      });

      setResults(response.data.results);
      console.log(results);
      console.log(allergies);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  const [first, setFirst] = useState(true);
  // här använder vi en useEffect för att köra searchRecipes när någon av variablarna "query", allergies eller "mealtype" ändras
  useEffect(() => {
    if (!first) {
      setUrl();
      searchRecipes();
    }
  }, [query, mealType, allergies]);

  useEffect(() => {
    if (first) {
      getQueryFromURL();

      setFirst(false);

      searchRecipes();
    }


  }, []);

  const setUrl = () => {
    window.history.replaceState(null, "Recipe Rescue Search", "/" + "query=" + query + "&allergies=" + allergies + "&mealtype=" + mealType);
  }

  const getQueryFromURL = () => {
    const queryParams = new URLSearchParams(params.search);
    if (queryParams.has("query")) {
      setQuery(queryParams.get("query"));
    }

    if (queryParams.has("allergies")) {
      setAllergies(queryParams.get("allergies"));
    }
    if (queryParams.has("mealtype")) {
      setMealType(queryParams.get("mealtype"));
    }
  }

  return (
    <div>

      <div>
        <NavigationBar />
        <Header />
        <ButtonGroupFunction
          setMealType={setMealType}
          setAllergies={setAllergies}
          firstButton={"Popular"}
        />
        <Searchbar setQuery={setQuery} />
        <RecipeContainer
          data={results}
          mealType={mealType}
          allergies={allergies}
          query={query}
        />
      </div>
      {/* Skickar vidare state funktioner för att sätta värden och skickar vidare "results" för att visa data i RecipeContainer som props */}
      <div id='section1'>
        <Map />
      </div>
      <Footer></Footer>
    </div>

  );
}

export default Home;
