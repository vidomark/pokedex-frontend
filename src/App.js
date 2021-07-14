import "./css/app.css";
import "./css/card.css";
import "./css/profile.css";
import "./css/navbar.css";
import "./css/form.css";
import "./css/index.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import PokemonProfile from "./components/pokemon/PokemonProfile";
import PokemonComponent from "./components/PokemonComponent";
import Index from "./components/Index";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ConfirmationTokenProvider from "./contexts/ConfirmationTokenProvider";
import PokemonListProvider from "./contexts/PokemonListProvider";
import GetUrlProvider from "./contexts/UrlProvider";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // In case of page refresh
  };

  const getPokemon = () => {
    try {
      return JSON.parse(localStorage.getItem("pokemon"));
    } catch (exception) {
      return null;
    }
  };

  let localStoragePokemon = getPokemon();
  return (
    <PokemonListProvider>
      <GetUrlProvider>
        <ConfirmationTokenProvider>
          <Router>
            <div className="App">
              <Menu />

              <Route exact path="/" component={Index} />

              <Route exact path="/registration" component={Registration} />

              <Route exact path="/login" component={Login} />

              <Route
                exact
                path="/pokemon"
                render={() => <PokemonComponent {...{ selectPokemon }} />}
              />

              {localStoragePokemon && (
                <Route
                  exact
                  path={`/pokemon/${localStoragePokemon.id}`}
                  render={() => (
                    <PokemonProfile
                      {...{ localStoragePokemon }}
                      {...{ selectPokemon }}
                      {...{ pokemon }}
                    />
                  )}
                />
              )}
            </div>
          </Router>
        </ConfirmationTokenProvider>
      </GetUrlProvider>
    </PokemonListProvider>
  );
}

export default App;
