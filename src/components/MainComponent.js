import React, { useCallback, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useHttp } from "../hooks/useHttp";

export default function MainComponent() {
  const pokemonUrl = "https://pokeapi.co/api/v2/";
  const [isLoaded, pokemons] = useHttp(pokemonUrl, []);

  return isLoaded && <Container></Container>;
}
