import React from 'react';
import { SearchContext } from '../../Context/SearchPokemon';
import Card from '../Card';
import { container, title } from './SearchResult.module.css';

function SearchResult({ setPokemonModal }) {
  const { searchPokemon: pokemon } = React.useContext(SearchContext);

  return (
    <div className={container}>
      <h2 className={title}>
        Resultado encontrado para: <span>{pokemon.name}</span>
      </h2>
      <Card pokemon={pokemon} setPokemonModal={setPokemonModal} />
    </div>
  );
}

export default SearchResult;
