import "./css/App.css";
import "./css/Card.css";
import "./css/Profile.css";
import "./css/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import PokemonProfile from "./components/PokemonProfile";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  let selectedPokemon = null; // in case of page refresh
  try {
    selectedPokemon = JSON.parse(localStorage.getItem("pokemon"));
  } catch (exception) {}

  const getPokemons = useCallback(() => {
    const url = "http://localhost:8080";
    axios
      .get(url)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const postData = useCallback((url, data) => {
    axios
      .post(url, data)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const selectPokemon = (pokemon) => {
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // in case of page refresh
  };

  const selectType = (url, type) => {
    postData(url, type);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Router>
      <div className="App">
        <Menu postData={postData} />

        {pokemonList && (
          <Route
            exact
            path="/"
            render={(props) => (
              <MainComponent
                pokemonList={pokemonList}
                selectPokemon={selectPokemon}
              />
            )}
          />
        )}

        {selectedPokemon && ( // pass id instead od pokemon
          <Route
            exact
            path={`/pokemon/${selectedPokemon.id}`}
            render={() => (
              <PokemonProfile
                selectType={selectType}
                selectedPokemon={selectedPokemon}
              />
            )}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
