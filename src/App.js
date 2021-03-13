import React, { useEffect } from 'react'

import { usePokemons } from './Context/Pokedex'

import Header from './components/Header'
import Pokedex from './components/Pokedex'
import API from './api'

import './App.css'

function App() {
  const { pokemons, setPokemons } = usePokemons()

  useEffect(() => {
    const fetchData = (_, index) => fetch(`${API}/${index + 1}`)
    .then(response => response.json())

    const fetchPokemonsPromises = () => Array(10).fill('').map(fetchData)

    const getAllPokemons = async () => {
      const allPokemons = await Promise.all(fetchPokemonsPromises())
      setPokemons(allPokemons)
    }

    getAllPokemons()
  }, [])

  return (
    <>
      <Header />
      { pokemons.length && 
        <Pokedex pokemonData={pokemons} /> }
    </>
  )
}
export default App