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
import PokemonListProvider from "./contexts/PokemonListProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GetUrlProvider from "./contexts/UrlProvider";
import React, { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const getSelectedPokemon = () => {
    try {
      return JSON.parse(localStorage.getItem("pokemon"));
    } catch (exception) {
      return null;
    }
  };

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon)); // in case of page refresh
  };

  let selectedPokemon = getSelectedPokemon();

  return (
    <PokemonListProvider>
      <GetUrlProvider>
        <ConfirmationTokenProvider>
          <Router>
            <div className="App">
              <Menu {...{ selectPokemon }} />

              <Route exact path="/" component={Index} />

              <Route exact path="/registration" component={Registration} />

              <Route exact path="/login" component={Login} />

              <Route
                exact
                path="/pokemon"
                render={() => <PokemonComponent {...{ selectPokemon }} />}
              />

              <Route
                exact
                path={`/pokemon/${selectedPokemon.id}`}
                render={() => (
                  <PokemonProfile {...{ selectedPokemon }} {...{ pokemon }} />
                )}
              />

              <Footer />
            </div>
          </Router>
        </ConfirmationTokenProvider>
      </GetUrlProvider>
    </PokemonListProvider>
  );
}

export default App;
