import React from "react";
import pokemonLogo from "../images/Pokemon_logo.svg";
import headerStyle from "../css/App.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to={"/"}>
        <img style={headerStyle} src={pokemonLogo} alt="pokemon" />
      </Link>
    </div>
  );
}
