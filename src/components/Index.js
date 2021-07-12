import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { gridStyle } from "../util/style";
import pokeballs from "../images/pokeballs.png";
import aboutPicture from "../images/about.jpg";
import "../css/index.css";

export default function Index() {
  return (
    <div className="main-container">
      {/* pokemon card */}
      <Grid
        container
        justify={gridStyle.justify}
        spacing={gridStyle.spacing}
        alignItems={gridStyle.alignItems}
      >
        <Grid item>
          <div
            class="index-card"
            style={{ backgroundImage: `url(${pokeballs})` }}
          >
            <div class="info">
              <h1 className="index-card-title">Pokemons</h1>
              <p>Checkout the list of available pokemons.</p>
              <Link to={`pokemon?limit=${loadedPokemonNumber}`}>
                <button>Show more</button>
              </Link>
            </div>
          </div>
        </Grid>

        <Grid item>
          <div className="divider"></div>
        </Grid>

        <Grid item>
          <div
            class="index-card"
            style={{
              backgroundImage: `url(${aboutPicture})`,
              backgroundPosition: "center",
            }}
          >
            <div class="info">
              <h1 className="index-card-title">About</h1>
              <p style={{}}>Checkout the project</p>
              <Link to="">
                <button>Show more</button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
