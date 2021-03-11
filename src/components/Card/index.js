import React from 'react'
import { pokemonTypesAsArray } from '../../utils'
import './card.css'

const card = ({ pokemon, showModal, getPokemon }) => {
  const handleCLick = () => {
    showModal()
    getPokemon(pokemon)
  }

  const types = pokemonTypesAsArray(pokemon)
  const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`

  return (
    <li className={"card " + (types[0])} onClick={() => handleCLick()}>
      <img 
        className="card-image" 
        src={imgUrl} 
        alt="nome pokemon" />
      <h2 className="card-title">{pokemon.name}</h2>
      <p className="card-subtitle">
        {types.join(' | ')}
      </p>
    </li>
  )
}


export default card