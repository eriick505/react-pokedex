const BASE_URL = 'https://pokeapi.co/api/v2';

const GET_POKEMON = pokemon => `${BASE_URL}/pokemon/${pokemon}`;

const GET_POKEMONS_LIST = (limit = 80, offset = 0) =>
  `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

const GET_POKEMON_SPECIES_BY_ID = id => `${BASE_URL}/pokemon-species/${id}`;

const GET_EVOLUTION_CHAINS_BY_SPECIE_DATA = data =>
  `${data.evolution_chain.url}`;

export {
  BASE_URL,
  GET_POKEMON,
  GET_POKEMONS_LIST,
  GET_POKEMON_SPECIES_BY_ID,
  GET_EVOLUTION_CHAINS_BY_SPECIE_DATA,
};
