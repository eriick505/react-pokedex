import React, { useEffect } from 'react';

import { usePokemons } from './Context/Pokedex';

import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';
import { getAllPokemons } from './api';

import './App.css';

function App() {
  const { pokemons, setPokemons } = usePokemons();

  useEffect(() => {
    const setPokemonsIntoPokedex = async () => {
      const allPokemons = await getAllPokemons();
      setPokemons(allPokemons);
    };
    setPokemonsIntoPokedex();
  }, [setPokemons]);

  return (
    <>
      <Header />
      {pokemons.length && <Pokedex pokemonData={pokemons} />}
      <Footer />
    </>
  );
}
export default App;
