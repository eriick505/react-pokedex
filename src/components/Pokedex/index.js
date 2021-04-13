import React from 'react';
import { GET_POKEMON_LIST } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import Card from '../Card';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
import { container, pokedex } from './Pokedex.module.css';

function Pokedex({ setPokemonModal }) {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    function pokemonList() {
      request(GET_POKEMON_LIST());
    }
    pokemonList();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div className={container}>
        <ul className={pokedex}>
          {data.results.map(pokemon => (
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              setPokemonModal={setPokemonModal}
            />
          ))}
        </ul>
      </div>
    );
  else return null;
}

export default Pokedex;
