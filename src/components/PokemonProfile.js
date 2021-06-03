import React, { useState } from "react";
import { useStyles } from "../util/style";
import { Grid, Paper } from "@material-ui/core";
import { convertPicture } from "../util/pictureConverter";
import { capitalizeText } from "../util/textCapitalizer";
import { createDataset } from "../util/datasetCreator";
import PokemonDetail from "./PokemonDetail";
import PokemonController from "./PokemonController";
import PokemonTable from "./PokemonTable";
import Chart from "./Chart";

export default function ProfilePage(props) {
  let [pokemon, setPokemon] = useState(props.selectedPokemon);
  const localStoragePokemon = JSON.parse(localStorage.getItem("pokemon"));
  pokemon = localStoragePokemon == null ? test : localStoragePokemon;
  console.log(pokemon);
  const [caught, setCaught] = useState(false); // for catching pokemon
  const pokeballImageSource = caught
    ? "https://freepngimg.com/thumb/pokemon/20148-3-pokeball-file.png?fbclid=IwAR22x7PCkYNuTRG6Bhd5tepQ8u03vHwyaoD59cttXRZMYU-rzPdyfdcdyJE"
    : "https://freepngimg.com/thumb/pokemon/20092-1-pokeball-transparent-image.png?fbclid=IwAR0JGJhEi7QaA8jYcrOLpCuEglKkIYpKw7Tr8vuhOAUT2MKcUoy3-sVRmDI";
  const pokeballImageClass = caught ? "pokeball caught" : "pokeball";
  const classes = useStyles();
  const dataset = createDataset(pokemon.stats);
  const statNames = pokemon.stats.map((stat) => capitalizeText(stat.stat.name));

  const selectPokemon = (pokemon) => {
    setPokemon(pokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
  };

  const selectType = (typeObject) => {
    const type = typeObject.type;
    const url = `http://localhost:8080/type/${type.name}`;
    props.selectType(url, type);
  };
  console.log(pokemon);
  return (
    <div className="main-container">
      <PokemonController pokemon={pokemon} selectPokemon={selectPokemon} />
      <Grid container className="classes.grid">
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <div>
              <img
                className="profile-picture"
                src={convertPicture(pokemon.id)}
                alt="pokemon"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item container xs={12} md={6} direction={"column"}>
          <Grid item>
            <Paper className={classes.Paper}>
              <PokemonTable pokemon={pokemon} />
            </Paper>
          </Grid>
          <Grid item>
            <PokemonDetail
              title={"Type"}
              details={pokemon.types}
              card={false}
              selectType={selectType}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <Chart labels={statNames} datasets={dataset} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={"box"}>
            <img
              src={pokeballImageSource}
              className={pokeballImageClass}
              onClick={() => setCaught(true)}
              alt="pokeball"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
