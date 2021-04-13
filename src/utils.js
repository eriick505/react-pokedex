const pokemonTypesAsArray = ({ types }) => types.map(({ type }) => type.name);

const getPokemonImageById = id =>
  `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

const getNecessaryDataFromEvoChains = ({ species, evolution_details }) => ({
  species_name: species.name,
  min_level: !evolution_details.length ? 1 : evolution_details[0].min_level,
  trigger_name: !evolution_details.length
    ? null
    : evolution_details[0].trigger.name,
  item: !evolution_details.length ? null : evolution_details.item,
});

function getAllEvolutions(data) {
  let storageArray = [];

  storageArray.push(getNecessaryDataFromEvoChains(data));

  let nextEvolution = data.evolves_to;

  nextEvolution.map(evolution => {
    return (storageArray = storageArray.concat(getAllEvolutions(evolution)));
  });

  return storageArray;
}

export { pokemonTypesAsArray, getPokemonImageById, getAllEvolutions };
