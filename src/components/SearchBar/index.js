import React from 'react'

import { usePokemons } from '../../Context/Pokedex'

import './searchBar.css'

export default function SearchBar() {
  const { pokemons, setPokemons } = usePokemons()

  const handleChange = e => {
    const inputValue = e.target.value
    console.log(inputValue);
    console.log(pokemons);
  }

  return (
    <div className="searchForm">
      <input 
        type="text" 
        id="search" 
        placeholder="Buscar Pokemon" 
        onChange={handleChange}
        />
    </div>
  )
}