import React, { useEffect, useState } from 'react'

import './evolutions.css'
import { usePokemons } from '../../../Context/Pokedex'
import { getEvolutionChainsById, getPokemonByNameOrId } from '../../../api'

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

    const getIdByName = async (name) => {
      const pokemonFiltered = pokemons.filter(pokemon => pokemon.name === name)

      console.log(pokemonFiltered)
  
      if(!pokemonFiltered.length) {
        const pokemonData = await getPokemonByNameOrId(name)
        console.log('caçando');
        console.log(pokemonData);
      }
    }

    // criar um estado para o pokemonfiltrado 
    // adicionar o mode strict novamente
    // adicionar que foi encontrado no fetch dentro do array de pokemons filtrados
    // finalizar o bug


  // const imgUrl = name => 
  //   `https://pokeres.bastionbot.org/images/pokemon/${getIdByName(name)}.png`

  return (
    <div className="evolutionBox">
      <h5>Evolution Chains</h5>

      <ul>
        {evoChains.map(poke => (
          <li key={poke.species_name}>
            {console.log(getIdByName(poke.species_name))}
            {/* <img
              src={imgUrl(poke.species_name)} 
              alt={poke.species_name}
            /> */}
            {poke.species_name} <br />
            {poke.min_level}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Evolutions