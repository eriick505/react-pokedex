import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import {
  GET_POKEMON_SPECIES_BY_ID,
  GET_EVOLUTION_CHAINS_BY_SPECIE_DATA,
  GET_POKEMON,
} from '../../../Api';
import {
  getNecessaryDataFromEvoChains,
  getPokemonImageById,
} from '../../../utils';
import Slide from '../../Slide';
import Loading from '../../Helpers/Loading';
import Error from '../../Helpers/Error';
import {
  evoContainer,
  evolutionList,
  evolutionItem,
  evolutionBoxImg,
  level,
  multipleEvolutions,
  mainPokemon,
  item,
} from './Evolutions.module.css';

const Evolutions = ({ pokemonId, color }) => {
  const [evolutions, setEvolutions] = React.useState([]);
  const [evolutionId, setEvolutionId] = React.useState([]);

  const { request: specieRequest } = useFetch();
  const { request: evolutionRequest, loading, error } = useFetch();

  React.useEffect(() => {
    async function getEvolution() {
      const { json: specieData } = await specieRequest(
        GET_POKEMON_SPECIES_BY_ID(pokemonId)
      );

      const { json: evoData } = await evolutionRequest(
        GET_EVOLUTION_CHAINS_BY_SPECIE_DATA(specieData)
      );

      const chainsData = getNecessaryDataFromEvoChains(evoData);
      setEvolutions(chainsData);
    }
    getEvolution();
  }, [specieRequest, evolutionRequest, pokemonId]);

  React.useEffect(() => {
    async function getIDsFromAllEvolutions() {
      if (evolutions.length) {
        const getIDs = evolutions.map(async evolution => {
          const response = await fetch(GET_POKEMON(evolution.species_name));
          const json = await response.json();

          return json.id;
        });

        const listIDs = await Promise.all(getIDs);
        setEvolutionId(listIDs);
      }
    }
    getIDsFromAllEvolutions();
  }, [evolutions]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (evolutions.length <= 1)
    return (
      <p style={{ textAlign: 'center', color: '#333' }}>
        Este pokemon não possui evoluções 😔
      </p>
    );
  if (evolutions.length <= 3)
    return (
      <div className={`${evoContainer} animateSlideRight`}>
        <ul className={evolutionList}>
          {evolutions.map((poke, index) => (
            <li key={poke.species_name} className={evolutionItem}>
              <div className={evolutionBoxImg}>
                <img
                  src={`${
                    evolutionId.length &&
                    getPokemonImageById(evolutionId[index])
                  }`}
                  alt={poke.species_name}
                />
              </div>
              <h5>{poke.species_name}</h5>
              {poke.min_level && (
                <span className={`${level} ${color}`}>
                  Lv. {poke.min_level}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  if (evolutions.length > 3)
    return (
      <div className={multipleEvolutions}>
        <div className={mainPokemon}>
          {evolutions
            .filter((_, index) => index === 0)
            .map((poke, index) => (
              <div key={poke.species_name}>
                <img
                  src={`${
                    evolutionId.length &&
                    getPokemonImageById(evolutionId[index])
                  }`}
                  alt={poke.species_name}
                />
                <h5>{poke.species_name}</h5>
              </div>
            ))}
        </div>

        <Slide itens={evolutions}>
          {evolutions
            .filter((_, index) => index !== 0)
            .map((poke, index) => (
              <div key={poke.species_name} className={item}>
                <img
                  src={`${
                    evolutionId.length &&
                    getPokemonImageById(evolutionId[index + 1])
                  }`}
                  alt={poke.species_name}
                />
                <h5>{poke.species_name}</h5>
              </div>
            ))}
        </Slide>
      </div>
    );
  else return null;
};

export default Evolutions;
