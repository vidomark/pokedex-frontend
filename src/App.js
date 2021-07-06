import "./css/app.css";
import "./css/card.css";
import "./css/profile.css";
import "./css/navbar.css";
import "./css/form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import PokemonProfile from "./components/pokemon/PokemonProfile";
import PokemonComponent from "./components/PokemonComponent";
import Index from "./components/Index";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ConfirmationTokenProvider from "./contexts/ConfirmationTokenProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadedPokemonNumber } from "./util/pokemonConfig";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [currentPokemonNumber, setCurrentPokemonNumber] =
    useState(loadedPokemonNumber);

  const getSelectedPokemon = () => {
    try {
      return JSON.parse(localStorage.getItem("pokemon"));
    } catch (exception) {
      return null;
    }
  };

  const getPokemons = useCallback((pokemonNumber) => {
    const url = `http://localhost:8080/pokemon?limit=${pokemonNumber}`;
    axios
      .get(url)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const postData = useCallback((url, data) => {
    console.log(data);
    axios
      .post(url, data)
      .then((result) => setPokemonList(result.data))
      .catch(console.error());
  }, []);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // in case of page refresh
  };

  let selectedPokemon = getSelectedPokemon();

  useEffect(() => {
    getPokemons(currentPokemonNumber);
  }, [currentPokemonNumber]);

  return (
    <ConfirmationTokenProvider>
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

          <Route exact path="/registration" component={Registration} />

          <Route exact path="/login" component={Login} />

          {pokemonList && (
            <Route
              exact
              path="/pokemon"
              render={(props) => (
                <PokemonComponent
                  {...{ pokemonList }}
                  {...{ selectPokemon }}
                  {...{ postData }}
                  {...{ setCurrentPokemonNumber }}
                  {...{ currentPokemonNumber }}
                />
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
    </ConfirmationTokenProvider>
  );
}

export default App;
