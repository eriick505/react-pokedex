import React from 'react';
import { pokemonTypesAsArray, getPokemonImageById } from '../../utils';
import { card, content, identity, types, thumb } from './Card.module.css';

function Card({ pokemon, setPokemonModal }) {
  const { name, id } = pokemon;
  const typeList = pokemonTypesAsArray(pokemon);

  function handleClick() {
    setPokemonModal(pokemon);
  }

  return (
    <div onClick={handleClick} className={`${card} ${typeList[0]}`}>
      <div className={content}>
        <h2>{name}</h2>
        <ul className={types}>
          {typeList.map(type => (
            <li key={type} className={type}>
              <img src={`img/types/${type}.png`} alt="type" />
              {type}
            </li>
          ))}
        </ul>
        <span className={identity}>#{id}</span>
      </div>

      <div className={thumb}>
        <img className="card-image" src={getPokemonImageById(id)} alt={name} />
      </div>
    </div>
  );
}

export default Card;
