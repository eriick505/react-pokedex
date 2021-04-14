import React from 'react';
import { pokemonTypesAsArray, getPokemonImageById } from '../../utils';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
import useFetch from '../../Hooks/useFetch';
import { card, content, identity, types, thumb } from './Card.module.css';

function Card({ pokemon, setPokemonModal }) {
  const { data, loading, error, request } = useFetch();

  function handleClick() {
    setPokemonModal(data);
  }

  React.useEffect(() => {
    function getPokemon() {
      request(pokemon.url);
    }
    getPokemon();
  }, [request, pokemon.url]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    const { name, id } = data;
    const typeList = pokemonTypesAsArray(data);

    return (
      <li onClick={handleClick} className={`${card} ${typeList[0]}`}>
        <div className={content}>
          <h2>{name}</h2>
          <ul className={types}>
            {typeList.map(type => (
              <li key={type} className={type}>
                {type}
              </li>
            ))}
          </ul>
          <span className={identity}>#{id}</span>
        </div>
        <div className={thumb}>
          <img
            className="card-image"
            src={getPokemonImageById(id)}
            alt={name}
          />
        </div>
      </li>
    );
  } else return null;
}

export default Card;
