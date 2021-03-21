import React from 'react'
import { pokemonTypesAsArray } from '../../utils'
import './card.css'

const Card = ({ pokemon, showModal, getPokemon }) => {
  const handleCLick = () => {
    showModal()
    getPokemon(pokemon)
  }

  const types = pokemonTypesAsArray(pokemon)
  const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`

  return (
    <li className={"card " + (types[0])} onClick={() => handleCLick()}>
      <div className="content">
        <h2>{pokemon.name}</h2>
        <ul className="types">
          {types.map(type => (
            <li key={type}>
              {type}
            </li>
          ))}
        </ul>
        <span className="id">
          #{pokemon.id}
        </span>
      </div>

      <div className="thumb">
        <img 
          className="card-image" 
          src={imgUrl} 
          alt={pokemon.name}
        />
      </div>
    </li>
  )
}


export default Card