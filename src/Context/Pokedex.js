import React, { createContext, useContext, useState } from 'react'

const PokedexContext = createContext()

export default function PokedexProvider({ children }) {
  const [pokemons, setPokemons] = useState([])

  return (
    <PokedexContext.Provider value={{
      pokemons,
      setPokemons
    }}>
      {children}
    </PokedexContext.Provider>
  )
}

export function usePokemons() {
  const context = useContext(PokedexContext);
  const { pokemons, setPokemons } = context
  return { pokemons, setPokemons }
}