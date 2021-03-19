import React, { useEffect, useState } from 'react'

import './evolutions.css'
import { usePokemons } from '../../../Context/Pokedex'
import { getEvolutionChainsById } from '../../../api'

const Evolutions = ({ pokemonId }) => {
  const [evoChains, setEvoChains] = useState([])
  const { pokemons, } = usePokemons()

  useEffect(() => {
    const evolutionChain = async () => {
      const data = await getEvolutionChainsById(pokemonId)
      setEvoChains(data) 
    }
    evolutionChain()
  }, [setEvoChains])

  const getPokemonIdByName = (name) => {
    const pokemonFiltered = pokemons.filter(pokemon => pokemon.name === name)
    return pokemonFiltered[0].id
  }

  const imgUrl = name => 
    `https://pokeres.bastionbot.org/images/pokemon/${getPokemonIdByName(name)}.png`

  return (
    <div className="evolutionBox">
      <h5>Evolution Chains</h5>

      <ul>
        {evoChains.map(poke => (
          <li key={poke.species_name}>
            <img
              src={imgUrl(poke.species_name)} 
              alt={poke.species_name}
            />
            {poke.species_name} <br />
            {poke.min_level}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Evolutions