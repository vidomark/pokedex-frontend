import React from "react";
import imagePath from "../images/Pokemon_logo.svg";
import headerStyle from "../css/App.css";

export default function Header() {
  return (
    <div>
      <img style={headerStyle} src={imagePath} alt="pokemon" />
    </div>
  );
}
