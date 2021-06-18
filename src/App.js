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
import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [postedData, setPostedData] = useState(null);
  const [url, setUrl] = useState("/");
  const [fetchUrl, setFetchUrl] = useState("http://localhost:8080/pokemon");
  const everyPokemon = useRef(true);
  const render = useRef(false);

  const getSelectedPokemon = () => {
    try {
      return JSON.parse(localStorage.getItem("pokemon"));
    } catch (exception) {
      return null;
    }
  };
  let selectedPokemon = getSelectedPokemon();

  const getPokemons = useCallback((fetchUrl) => {
    const url = "http://localhost:8080/pokemon";
    axios
      .get(fetchUrl)
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
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // in case of page refresh
  };

  const selectType = (url, type) => {
    setPostedData(type);
    setFetchUrl(url);
    render.current = false;
    everyPokemon.current = false;
    postData(url, type);
    const newUrl = url.split("http://localhost:8080")[1];
    setUrl(newUrl);
  };

  useEffect(() => {
    if (everyPokemon.current === true) {
      getPokemons(fetchUrl);
      //render.current = true;
    } else {
      //postData(fetchUrl, postedData);
      //render.current = true;
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {pokemonList && (
          <Menu
            {...{ postData }}
            {...{ pokemonList }}
            {...{ selectPokemon }}
            {...{ selectType }}
            {...{ setPokemonList }}
          />
        )}

        {pokemonList && (
          <Route
            exact
            path={url}
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
                {...{ selectType }}
                {...{ selectedPokemon }}
                {...{ pokemon }}
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
