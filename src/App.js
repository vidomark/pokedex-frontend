import "./css/App.css";
import "./css/Card.css";
import "./css/Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonProfile from "./components/PokemonProfile";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [type, setType] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState("http://localhost:8080");
  const [isLoaded, pokemonData] = useFetch(pokemonUrl, [pokemonUrl]);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
  };
  const selectType = (type) => {
    setType(type);
    const newUrl = `https://pokeapi.co/api/v2/type/${type}`;
    setPokemonUrl(newUrl);
  };

  return (
    <Router>
      <div className="App">
        <Header />

        {isLoaded && (
          <Route
            exact
            path="/"
            render={(props) => (
              <MainComponent
                pokemonData={pokemonData}
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
