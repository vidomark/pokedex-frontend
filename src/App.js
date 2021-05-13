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

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [type, setType] = useState(null);

  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=18"
  );

  const fetchPokemons = (url) => {
    axios.get(url).then((result) => setPokemonData(result));
  };

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
  };
  const selectType = (type) => {
    setType(type);
    const newUrl = `https://pokeapi.co/api/v2/type/${type}`;
    setPokemonUrl(newUrl);
  };

  const nextPage = () => {
    fetchPokemons(pokemonData.data.next);
  };

  const previousPage = () => {
    fetchPokemons(pokemonData.data.previous);
  };

  useEffect(() => {
    fetchPokemons(pokemonUrl);
  }, [pokemonUrl]);

  return (
    <Router>
      <div className="App">
        <Header />

        {pokemonData && (
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <MainComponent
                  pokemonData={pokemonData}
                  selectPokemon={selectPokemon}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  type={type}
                />
              </React.Fragment>
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
