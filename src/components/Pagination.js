import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { loadedPokemonNumber } from "../util/pokemonConfig";

export default function Pagination({ currentPokemonNumber, loadPokemons }) {
  return (
    <Grid container justify="center">
      <Grid item>
        <div className="pagination-button-container">
          <Link
            to={`/pokemon?limit=${currentPokemonNumber + loadedPokemonNumber}`}
          >
            <button onClick={() => loadPokemons()} className="button">
              Load more...
            </button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
