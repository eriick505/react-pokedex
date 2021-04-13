const pokemonTypesAsArray = ({ types }) => types.map(({ type }) => type.name);

const getPokemonImageById = id =>
  `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

const getNecessaryDataFromEvoChains = data => {
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
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  return evoChains;
};

export {
  pokemonTypesAsArray,
  getPokemonImageById,
  getNecessaryDataFromEvoChains,
};
