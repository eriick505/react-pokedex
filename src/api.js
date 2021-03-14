const API = 'https://pokeapi.co/api/v2/pokemon'

const fetchData = (_, index) => fetch(`${API}/${index + 1}`)
  .then(response => response.json())

const fetchPokemonsPromises = () => Array(1).fill('').map(fetchData)

const getAllPokemons = async () => {
  const allPokemons = await Promise.all(fetchPokemonsPromises())
  return allPokemons
}

const getAllPokemonsSpecies = async () => {
  const allPokemons = await getAllPokemons()

  const allUrlSpecies = allPokemons.map(pokemon => pokemon.species.url)

  const speciesPromises = allUrlSpecies.map(url => fetch(url)
    .then(r => r.json()))

  const speciesData = await Promise.all(speciesPromises)
  return speciesData
}

const getAllEvolutionChains = async () => {
  const allPokemonsSpecies = await getAllPokemonsSpecies();

  const allUrlEvolutionsChains = allPokemonsSpecies.map(specie => specie.evolution_chain.url)
  const evolutionChainsPromises = allUrlEvolutionsChains.map(url => fetch(url)
    .then(r => r.json()))

  const evoChainsData = await Promise.all(evolutionChainsPromises)
  console.log(evoChainsData[0].chain);

  const createObjectEvoChains = () => {
    let evoChains = []
    let evoData = evoChainsData[0].chain
  
    do {
      let numberOfEvolutions = evoData.evolves_to.lenght
      let evoDetails = evoData.evolution_details[0]

      evoChains.push({
        "species_name": evoData.species.name
      })

  
      // if(numberOfEvolutions > 1) {
      //   for(let i = 1; i < numberOfEvolutions; i ++) {
      //     evoChains.push({
      //       "species_name": evoData.species.name,
      //       "min_level": !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].min_level,
      //       "trigger_name": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].trigger.name,
      //       "item": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].item
      //     })
      //   }
      // }
  
      evoData = evoData.evolves_to[0]
    } while(!!evoData && evoData.hasOwnProperty('evolves_to'))

    return evoChains
  }
  console.log(createObjectEvoChains());
}

export {
  API,
  getAllPokemons,
  getAllEvolutionChains
}