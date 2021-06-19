import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./pokemon/PokemonCard";
import { Container } from "react-bootstrap";
import { Grid } from "@material-ui/core";

export default function MainComponent(props) {
  const {
    selectPokemon,
    pokemonList,
    postData,
    setPokemonNumber,
    pokemonNumber,
  } = props;
  const [visible, setVisible] = useState(18);
  const loadPokemons = () => {
    setPokemonNumber((previous) => previous + 18);
    setVisible((previous) => previous + 18);
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
              <Link to={`/pokemon?limit=${pokemonNumber + 18}`}>
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
