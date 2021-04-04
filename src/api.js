const BASE_URL = "https://pokeapi.co/api/v2";

const fetchData = (_, index) =>
  fetch(`${BASE_URL}/pokemon/${index + 128}`).then((response) =>
    response.json()
  );

const fetchPokemonsPromises = () => Array(15).fill("").map(fetchData);

const getAllPokemons = async () => {
  const allPokemons = await Promise.all(fetchPokemonsPromises());
  return allPokemons;
};

const getByIdPokemonSpecie = async (id) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  return await response.json();
};

const getEvolutionChainsById = async (id) => {
  const specieData = await getByIdPokemonSpecie(id);

  const evolutionChainsUrl = specieData.evolution_chain.url;

  const getEvolutionChainsData = async () => {
    const response = await fetch(evolutionChainsUrl);
    return await response.json();
  };

  const evochainsData = await getEvolutionChainsData();

  const createObjectEvoChains = (data) => {
    let evoChains = [];
    let evoData = data.chain;
    let evolutionTo = evoData.evolves_to;

    do {
      let numberOfEvolutions = evoData.evolves_to.length;
      let evoDetails = evoData.evolution_details[0];

      evoChains.push({
        species_name: evoData.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      if (numberOfEvolutions > 1) {
        evolutionTo.map((evo, index) => {
          const { evolution_details, species } = evo;

          if (index === 0) {
            return null;
          }

          return evoChains.push({
            species_name: !species ? null : species.name,
            min_level: !evolution_details.length
              ? 1
              : evolution_details[0].min_level,
            item: !evolution_details.length
              ? null
              : evolution_details[0].item?.name,
          });
        });
      }

      evoData = evoData.evolves_to[0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
    return evoChains;
  };

  return createObjectEvoChains(evochainsData);
};

const getPokemonByNameOrId = async (nameOrId) => {
  if (nameOrId) {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    return await response.json();
  }
};

const getPokemonImageById = (id) =>
  `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

export {
  BASE_URL,
  getAllPokemons,
  getEvolutionChainsById,
  getPokemonByNameOrId,
  getPokemonImageById,
};
