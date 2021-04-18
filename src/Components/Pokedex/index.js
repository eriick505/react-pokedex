import React from 'react';
import { GET_POKEMONS_LIST } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import Card from '../Card';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
import { container, pokedex } from './Pokedex.module.css';

function Pokedex({ setPokemonModal }) {
  const [listPokemon, setListPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { data, error, request } = useFetch();

  React.useEffect(() => {
    function getPokemonListFromPage() {
      request(GET_POKEMONS_LIST());
    }

    getPokemonListFromPage();
  }, [request]);

  React.useEffect(() => {
    async function getPokemonList() {
      try {
        const getEachPokemonFromList = async pokemon => {
          setLoading(true);
          const response = await fetch(pokemon.url);
          if (!response.ok) throw new Error('Falha ao buscar pokemon');
          return await response.json();
        };

        const promisesFromList = data.results.map(getEachPokemonFromList);

        const listResolved = await Promise.all(promisesFromList);
        setListPokemon(listResolved);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (data) {
      getPokemonList();
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (listPokemon)
    return (
      <div className={container}>
        <ul className={pokedex}>
          {listPokemon.map(pokemon => (
            <li key={pokemon.name}>
              <Card pokemon={pokemon} setPokemonModal={setPokemonModal} />
            </li>
          ))}
        </ul>
      </div>
    );
  else return null;
}

export default Pokedex;
