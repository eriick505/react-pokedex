const API = 'https://pokeapi.co/api/v2/pokemon'

const fetchData = (_, index) => fetch(`${API}/${index + 1}`)
  .then(response => response.json())

const fetchPokemonsPromises = () => Array(26).fill('').map(fetchData)

const getAllPokemons = async () => {
  const allPokemons = await Promise.all(fetchPokemonsPromises())
  return allPokemons
}

const getPokemonSpeciesById = async (id) => {
  const allPokemons = await getAllPokemons()

  const allUrlSpecies = allPokemons.map(pokemon => pokemon.species.url)

  const speciesPromises = allUrlSpecies.map(url => fetch(url)
    .then(r => r.json()))

  const speciesData = await Promise.all(speciesPromises)
  
  return speciesData[id - 1]
}

const getEvolutionChainsById = async (id) => {
  const specieData = await getPokemonSpeciesById(id);

  const evolutionChainsUrl = specieData.evolution_chain.url

  const getEvolutionChainsData = async () => {
    const response = await fetch(evolutionChainsUrl)
    return await response.json()
  }

  const evochainsData = await getEvolutionChainsData()

  const createObjectEvoChains = (data) => {
    let evoChains = []
    let evoData = data.chain

    do {
      let numberOfEvolutions = evoData.evolves_to.lenght
      let evoDetails = evoData.evolution_details[0]

      evoChains.push({
        "species_name": evoData.species.name,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "item": !evoDetails ? null : evoDetails.item
      })

      if(numberOfEvolutions > 1) {
        for(let i = 1; i < numberOfEvolutions; i++){
          evoChains.push({
            "species_name": evoData.evolves_to[i].species.name,
            "min_level": !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].min_level,
            "trigger_name": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].trigger_name,
            "item": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].item
          })
        }
      }
  
      evoData = evoData.evolves_to[0]

    } while(!!evoData && evoData.hasOwnProperty('evolves_to'))

    return evoChains
  }

  return createObjectEvoChains(evochainsData)
}

const getPokemonByNameOrId = async nameOrId => {
  if(nameOrId) {
    const response = await fetch(`${API}/${nameOrId}`)
    return await response.json()
  }
}

export {
  API,
  getAllPokemons,
  getPokemonSpeciesById,
  getEvolutionChainsById,
  getPokemonByNameOrId
}