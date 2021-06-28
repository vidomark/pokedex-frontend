import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./pokemon/PokemonCard";
import { Container } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import {loadedPokemonNumber} from "../../src/util/pokemonConfig"

export default function MainComponent(props) {
  const {
    selectPokemon,
    pokemonList,
    postData,
    setCurrentPokemonNumber,
    currentPokemonNumber
  } = props;

  const [visible, setVisible] = useState(loadedPokemonNumber);
  const loadPokemons = () => {
    setCurrentPokemonNumber((previous) => previous + loadedPokemonNumber);
    setVisible((previous) => previous + loadedPokemonNumber);
  };

  return (
    pokemonList && (
      <Container className="main-container">
        {pokemonList.slice(0, visible).map((pokemon, index) => (
          <PokemonCard
            key={pokemon.name}
            pokemonData={pokemon}
            {...{ selectPokemon }}
            {...{ postData }}
          />
        ))}
        <Grid container justify="center">
          <Grid item>
            <div className="pagination-button-container">
              <Link to={`/pokemon?limit=${currentPokemonNumber + loadedPokemonNumber}`}>
                <button onClick={() => loadPokemons()} className="button">
                  Load more...
                </button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    )
  );
}
