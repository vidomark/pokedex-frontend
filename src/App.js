import "./css/App.css";
import "./css/Card.css";
import "./css/Profile.css";
import "./css/Pagination.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [type, setType] = useState(null);
  const [offset, setOffset] = useState(0);
  const [pokemonUrl, setPokemonUrl] = useState(
    //"https://pokeapi.co/api/v2/pokemon?offset=0&limit=18"
    "http://localhost:8080"
  );
  const [isLoaded, pokemonData] = useFetch(pokemonUrl, [pokemonUrl]);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
  };
  const selectType = (type) => {
    setType(type);
    const newUrl = `https://pokeapi.co/api/v2/type/${type}`;
    setPokemonUrl(newUrl);
  };

  const nextPage = () => {
    setOffset((prev) => {
      const newOffset = prev + 20;
      const newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=18`;
      setPokemonUrl(newUrl);
      return newOffset;
    });
  };

  const previousPage = () => {
    setOffset((prev) => {
      const newOffset = prev - 20;
      const newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=18`;
      setPokemonUrl(newUrl);
      return newOffset;
    });
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
                nextPage={nextPage}
                previousPage={previousPage}
              />
            )}
          />
        )}

        {pokemon && (
          <Route
            exact
            path={`/profile/${pokemon.id}`}
            render={() => (
              <ProfilePage selectType={selectType} pokemon={pokemon} />
            )}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
