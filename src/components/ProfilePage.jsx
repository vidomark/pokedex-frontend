import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { convertPicture } from "../util/pictureConverter";
import { capitalizeText } from "../util/textCapitalizer";
import PokemonDetail from "./PokemonDetail";
import Chart from "./Chart";
import { Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    width: "100px",
    height: "100px",
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

const createDataset = (stats) => {
  const statValues = stats.map((stat) => stat.base_stat);
  const statStyle = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(255, 99, 132, 0.6)",
    ],
    borderWidth: 2,
    borderColor: "#777",
    hoverBorderWidth: 3,
    hoverBorderColor: "#000",
  };
  return [
    {
      label: "Statistics",
      data: statValues,
      backgroundColor: statStyle.backgroundColor,
      borderWidth: statStyle.borderWidth,
      borderColor: statStyle.borderColor,
      hoverBorderWidth: statStyle.hoverBorderWidth,
      hoverBorderColor: statStyle.hoverBorderColor,
    },
  ];
};

export default function ProfilePage(props) {
  const pokemon = props.pokemon;
  const classes = useStyles();
  const dataset = createDataset(pokemon.stats);
  const statNames = pokemon.stats.map((stat) => capitalizeText(stat.stat.name));
  return (
    <div className="main-container">
      <Grid item xs={12}>
        <Paper className="buttonDiv">
          <Button variant="outline-primary" className="button">
            Primary
          </Button>
          <div className="pokemon-name">{pokemon.name}</div>
          <Button variant="outline-primary" className="button">
            Primary
          </Button>
        </Paper>
      </Grid>
      <Grid container spacing={4} className="classes.grid">
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <div>
              <img
                className={"profile-picture"}
                src={convertPicture(pokemon.id)}
                alt=""
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <table>
              <tbody>
                <tr>
                  <th>Species</th>
                  <th>Base experience</th>
                </tr>
                <tr>
                  <td>{capitalizeText(pokemon.species.name)}</td>
                  <td>{pokemon.base_experience}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
                <tr>
                  <td>{pokemon.height}</td>
                  <td>{pokemon.weight}</td>
                </tr>
                <tr>
                  <th>Abilities</th>
                </tr>
                {pokemon.abilities.map((ability) => {
                  ability = ability.ability;
                  return (
                    <tr key={ability.name}>
                      <td>{capitalizeText(ability.name)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <Chart labels={statNames} datasets={dataset} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <PokemonDetail title={"Type"} details={pokemon.types} />
        </Grid>
      </Grid>
    </div>
  );
}
