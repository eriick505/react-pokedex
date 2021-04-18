import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Pokedex from './Components/Pokedex';
import Modal from './Components/Modal';
import './App.css';
import SearchResult from './Components/SearchResult';
import { SearchContext } from './Context/SearchPokemon';

function App() {
  const [pokemonModal, setPokemonModal] = React.useState(null);
  const { foundPokemon } = React.useContext(SearchContext);

  return (
    <>
      <Header />

      {foundPokemon ? (
        <SearchResult setPokemonModal={setPokemonModal} />
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
