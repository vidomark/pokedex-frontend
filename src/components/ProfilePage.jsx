import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { convertPicture } from "../util/pictureConverter";
import PokemonDetail from "./PokemonDetail";

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

export default function ProfilePage(props) {
  const temp_json = props.pokemon;
  const { name, id, weight, height } = props.pokemon;
  const classes = useStyles();

  return (
    <div className="main-container">
      <div>
        <button
          style={{ align: "center" }}
          onClick={() => console.log("clicked!")}
          type="submit"
          value="submit"
        >
          click!
        </button>
        <button
          onClick={() => console.log("clicked!")}
          type="submit"
          value="submit"
        >
          click!
        </button>
      </div>
      <Grid container spacing={4} className="classes.grid">
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <div>
              <img
                className={"profile-picture"}
                src={convertPicture(id)}
                alt=""
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <PokemonDetail title={name} details={props.pokemon.types} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>
            <table>
              <tbody>
                <tr>
                  <th>Pokemon Name</th>
                  <th>Abilities</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Generation</th>
                </tr>
                <tr>
                  <td>{name}</td>
                  <td>{}</td>
                  <td>{height}</td>
                  <td>{weight}</td>
                </tr>
              </tbody>
            </table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.Paper}>BRuH</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
