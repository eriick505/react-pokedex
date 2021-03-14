import React, { useEffect, useState } from 'react'

import './evolutions.css'
import { getEvolutionChainsById } from '../../../api'

const Evolutions = ({ pokemonId }) => {
  const [evoChains, setEvoChains] = useState([])

  useEffect(() => {
    const evolutionChain = async () => {
      const data = await getEvolutionChainsById(pokemonId)
      setEvoChains(data) 
    }
    evolutionChain()

    const dividirArray = (base, max) => {
      let result = []
  
      for (let i = 0; i < base.length; i = i+(max-1)) {
        result.push(base.slice(i, (i+max)))
      }
      return result;
    }
  
    console.log(dividirArray(evoChains, 2));
  }, [setEvoChains])

  return (
    <div className="evolutionBox">
      <h5>Evolution Chain</h5>

      <ul>
        {evoChains.map(item => (
          <li key={item.species_name}>
            {item.species_name}
            {item.min_level}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Evolutions