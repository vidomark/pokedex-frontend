import React from "react";
import imagePath from "../images/Pokemon_logo.svg";

export default function Header() {
  return (
    <div>
      <img src={imagePath} alt="pokemon logo" />
    </div>
  );
}
