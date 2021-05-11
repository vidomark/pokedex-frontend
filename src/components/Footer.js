import React from "react";
import { footerStyle } from "../css/App.css";

export default function Footer() {
  return (
    <div style={footerStyle}>
      <h1>GOTTA CATCH 'EM ALL!</h1>
      <h2> Pokékodex Brought to you by Vido and Zang</h2>
      <p>
        This is a pokemon overview site, that uses pokeApi, as the main source
        of information!
      </p>
    </div>
  );
}
