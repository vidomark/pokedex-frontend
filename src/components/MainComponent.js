import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import { Container } from "react-bootstrap";
import { Grid } from "@material-ui/core";

export default function MainComponent(props) {
  const { selectPokemon, pokemonList, postData } = props;
  const [visible, setVisible] = useState(18);
  const loadPokemons = () => {
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
            {visible < pokemonList.length ? (
              <div className="pagination-button-container">
                <button onClick={() => loadPokemons()} className="button">
                  Load more...
                </button>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    )
  );
}
