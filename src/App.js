import "./css/App.css";
import "./css/Card.css";
import "./css/Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonProfile from "./components/PokemonProfile";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState("http://localhost:8080");
  const [pokemonList, setPokemonList] = useState(null);

  const getPokemons = useCallback(() => {
    axios
      .get(pokemonUrl)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, [pokemonUrl]);

  const postType = useCallback((type) => {
    const url = `http://localhost:8080/type/${type.name}`;
    axios
      .post(url, type)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
  };

  const selectType = (type) => {
    postType(type);
  };

  useEffect(() => {
    getPokemons();
  }, [pokemonUrl]);

  return (
    <Router>
      <div className="App">
        <Header />

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

        {pokemon && (
          <Route
            exact
            path={`/pokemon/${pokemon.id}`}
            render={() => (
              <PokemonProfile selectType={selectType} pokemon={pokemon} />
            )}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
