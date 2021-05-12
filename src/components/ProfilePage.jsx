import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { convertPicture } from "../util/pictureConverter";
import { capitalizeText } from "../util/textCapitalizer";
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
  const {
    name,
    id,
    weight,
    height,
    types,
    abilities,
    species,
    stats,
    forms,
    base_experience,
    held_items,
  } = props.pokemon;
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
            <table>
              <tbody>
                <tr>
                  <th>Species</th>
                  <th>Base experience</th>
                </tr>
                <tr>
                  <td>{capitalizeText(species.name)}</td>
                  <td>{base_experience}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
                <tr>
                  <td>{height}</td>
                  <td>{weight}</td>
                </tr>
                <tr>
                  <th>Abilities</th>
                </tr>
                {abilities.map((ability) => {
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
            <div>chart</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <PokemonDetail title={"Type"} details={types} />
        </Grid>
      </Grid>
    </div>
  );
}
