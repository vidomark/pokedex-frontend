import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

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
  console.log(temp_json);
  const {name, sprites, id, weight, height } = props.pokemon;
  console.log(id,name);
  const classes = useStyles();

  const getBetterPng = (id) => {
    if (id < 10) return  `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`;
    if(10 <= id && id < 100 )  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`;
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  }

  console.log(getBetterPng);

  return (
    <div className="main-container">
     <Grid container spacing={4} className="classes.grid">
      <Grid item xs={12} md={6}>
        <Paper className={classes.Paper}>
           <div> 
             <img className={'profile-picture'} src={getBetterPng(id)} alt="" />
           </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.Paper}>
          <table>
            <th>1</th>
            <tr> 123</tr>
            <th>2</th>
              <tr>124</tr>
            <th>3</th>
            <th>4</th>
          </table>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.Paper}>BRAH</Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.Paper}>BRuH</Paper>
      </Grid>
    </Grid> 
    </div>
  );
}
