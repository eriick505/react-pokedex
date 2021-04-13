import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Pokedex from './Components/Pokedex';
import Modal from './Components/Modal';
import './App.css';

function App() {
  const [pokemonModal, setPokemonModal] = React.useState(null);

  return (
    <>
      <Header />
      <Pokedex setPokemonModal={setPokemonModal} />
      {pokemonModal && (
        <Modal pokemonModal={pokemonModal} setPokemonModal={setPokemonModal} />
      )}
      <Footer />
    </>
  );
}

export default App;
