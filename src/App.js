import "./css/App.css";
import "./css/Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Route
          exact
          path="/"
          render={(props) => (
            <React.Fragment>
              <MainComponent selectPokemon={selectPokemon} />
            </React.Fragment>
          )}
        />
        {pokemon && (
          <Route
            exact
            path={`/profile/${pokemon.id}`}
            render={() => <ProfilePage pokemon={pokemon} />}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
