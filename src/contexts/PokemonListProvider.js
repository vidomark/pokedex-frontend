import React, { useState, useContext, createContext } from "react";

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

  return (
    <PokemonListContext.Provider value={pokemons}>
      <SetPokemonListContext.Provider value={setPokemons}>
        {children}
      </SetPokemonListContext.Provider>
    </PokemonListContext.Provider>
  );
}
