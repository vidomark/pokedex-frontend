import React, { useState, useContext, createContext } from "react";
import { useEffect } from "react";
import token from "../util/token";

const PokemonListContext = createContext();
const SetPokemonListContext = createContext();

export const usePokemons = () => {
  return useContext(PokemonListContext);
};

export const useSetPokemons = () => {
  return useContext(SetPokemonListContext);
};

export default function PokemonListProvider({ children }) {
  const [pokemons, setPokemons] = useState(null);

  // If logged out, clear out pokemons
  useEffect(() => {
    if (token.getToken() == null) setPokemons(null);
    /* eslint-disable */
  }, [token.getToken()]);

  return (
    <PokemonListContext.Provider value={pokemons}>
      <SetPokemonListContext.Provider value={setPokemons}>
        {children}
      </SetPokemonListContext.Provider>
    </PokemonListContext.Provider>
  );
}
