import "./css/App.css";
import "./css/Card.css";
import "./css/Profile.css";
import "./css/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import PokemonProfile from "./components/pokemon/PokemonProfile";
import MainComponent from "./components/MainComponent";
import Index from "./components/Index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const everyPokemon = useRef(true);

  const getSelectedPokemon = () => {
    try {
      return JSON.parse(localStorage.getItem("pokemon"));
    } catch (exception) {
      return null;
    }
  };
  let selectedPokemon = getSelectedPokemon();

  const getPokemons = useCallback(() => {
    const url = "http://localhost:8080/pokemon";
    axios
      .get(url)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const postData = useCallback((url, data) => {
    everyPokemon.current = false; // to not load every pokemon

    axios
      .post(url, data)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // in case of page refresh
  };

  useEffect(() => {
    if (everyPokemon.current === true) getPokemons();
  }, []);

  return (
    <Router>
      <div className="App">
        {pokemonList && (
          <Menu
            {...{ postData }}
            {...{ pokemonList }}
            {...{ selectPokemon }}
            {...{ setPokemonList }}
          />
        )}

        <Route exact path="/" component={Index} />

        {pokemonList && (
          <Route
            exact
            path={"/pokemon"}
            render={(props) => (
              <MainComponent {...{ pokemonList }} {...{ selectPokemon }} />
            )}
          />
        )}

        {selectedPokemon && (
          <Route
            exact
            path={`/pokemon/${selectedPokemon.id}`}
            render={() => (
              <PokemonProfile
                {...{ selectedPokemon }}
                {...{ pokemon }}
                {...{ postData }}
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
