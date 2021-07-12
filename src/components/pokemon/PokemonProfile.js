import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { convertPicture } from "../../util/pictureConverter";
import { capitalizeText } from "../../util/textCapitalizer";
import { createDataset } from "../../util/datasetCreator";
import { useSetPokemons } from "../../contexts/PokemonListProvider";
import PokemonDetail from "./PokemonDetail";
import PokemonController from "./PokemonController";
import PokemonTable from "./PokemonTable";
import Chart from "../Chart";

export default function ProfilePage({
  pokemon,
  localStoragePokemon,
  selectPokemon,
}) {
  // Nullify pokemons to disable search function
  const setPokemons = useSetPokemons();
  setPokemons(null);

  pokemon = pokemon == null ? localStoragePokemon : pokemon; // In case of page refresh
  const [caught, setCaught] = useState(false); // For catching pokemon

  // Creating dataset for chart
  const dataset = createDataset(pokemon.stats);
  const statNames = pokemon.stats.map((stat) => capitalizeText(stat.stat.name));

  // For catching pokemons
  const pokeballImageSource = caught
    ? "https://freepngimg.com/thumb/pokemon/20148-3-pokeball-file.png?fbclid=IwAR22x7PCkYNuTRG6Bhd5tepQ8u03vHwyaoD59cttXRZMYU-rzPdyfdcdyJE"
    : "https://freepngimg.com/thumb/pokemon/20092-1-pokeball-transparent-image.png?fbclid=IwAR0JGJhEi7QaA8jYcrOLpCuEglKkIYpKw7Tr8vuhOAUT2MKcUoy3-sVRmDI";
  const pokeballImageClass = caught ? "pokeball caught" : "pokeball";

  return (
    <div className="main-container">
      <PokemonController {...{ pokemon }} {...{ selectPokemon }} />
      <Grid container className="classes.grid">
        <Grid item xs={12} md={6}>
          <div>
            <img
              className="profile-picture"
              src={convertPicture(pokemon.id)}
              alt="pokemon"
            />
          </div>
        </Grid>
        <Grid item container xs={12} md={6} direction={"column"}>
          <Grid item>
            <PokemonTable {...{ pokemon }} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Chart labels={statNames} datasets={dataset} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PokemonDetail title={"Type"} details={pokemon.types} card={false} />

          <img
            src={pokeballImageSource}
            className={pokeballImageClass}
            onClick={() => setCaught(true)}
            alt="pokeball"
          />
        </Grid>
      </Grid>
    </div>
  );
}
