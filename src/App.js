import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Pokedex from './Components/Pokedex';
import Modal from './Components/Modal';
import './App.css';
import SearchResult from './Components/SearchResult';

function App() {
  const [pokemonModal, setPokemonModal] = React.useState(null);
  const [searchPokemon, setSearchPokemon] = React.useState(null);
  const [foundPokemon, setFoundPokemon] = React.useState(false);

  return (
    <>
      <Header
        setSearchPokemon={setSearchPokemon}
        setFoundPokemon={setFoundPokemon}
      />

      {foundPokemon ? (
        <SearchResult
          pokemon={searchPokemon}
          setPokemonModal={setPokemonModal}
        />
      ) : (
        <Pokedex setPokemonModal={setPokemonModal} />
      )}

      {pokemonModal && (
        <Modal pokemonModal={pokemonModal} setPokemonModal={setPokemonModal} />
      )}
      <Footer />
    </>
  );
}

export default App;
