import React, { useState } from 'react'

import './pokedex.css'
import Card from '../Card'
import Modal from '../Modal'

export default function Pokedex({ pokemonData }) {
  const [show, setShow] = useState(false)
  const [pokemonClicked, setPokemonClicked] = useState([])

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  const getPokemon = pokemon => {
    setPokemonClicked(pokemon)
  }

  return (
    <div className="container">
      <h1>Pokedex</h1>
      <ul data-js="pokedex" className="pokedex">
        {pokemonData.map(item => (
          <Card 
            key={item.id} 
            pokemon={item} 
            showModal={showModal}
            getPokemon={getPokemon}
          />
        ))}
      </ul>

      { show && 
        <Modal 
          modalIsOpen={show} 
          hideModal={hideModal} 
          pokemon={pokemonClicked} 
        /> }
    </div>
  )
}