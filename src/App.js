import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import ProfilePage from './profilePageComponents/ProfilePage';

function App() {
  const selectedPokemon = (pokemonData) => {
    return pokemonData;
  };

  return (
    <Router>
      <div className='App'>
        <Header />
        <Route
          exact
          path='/'
          render={(props) => (
            <React.Fragment>
              <MainComponent selectedPokemon={selectedPokemon} />
            </React.Fragment>
          )}
        />
        <Route
          path='/profile'
          render={() => <ProfilePage />}
          selectedPokemon={selectedPokemon}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
