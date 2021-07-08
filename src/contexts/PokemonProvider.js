import React, { useState, useContext, createContext } from "react";

const PokemonContext = createContext();
const SetPokemonContext = createContext();

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export const useSetPokemon = () => {
  return useContext(SetPokemonContext);
};

export default function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);

  return (
    <PokemonContext.Provider value={pokemon}>
      <SetPokemonContext.Provider value={setPokemon}>
        {children}
      </SetPokemonContext.Provider>
    </PokemonContext.Provider>
  );
}
