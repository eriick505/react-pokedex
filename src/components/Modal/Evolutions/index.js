import React, { useEffect, useState } from "react";

import styles from "./evolutions.module.css";
import { usePokemons } from "../../../Context/Pokedex";
import { getEvolutionChainsById, getPokemonByNameOrId } from "../../../api";

const Evolutions = ({ pokemonId, color }) => {
  const [evoChains, setEvoChains] = useState([]);
  const [pokeImgId, setPokeImgId] = useState([]);
  const { pokemons } = usePokemons();

  useEffect(() => {
    const evolutionChain = async () => {
      const data = await getEvolutionChainsById(pokemonId);
      setEvoChains(data);
    };
    evolutionChain();
  }, [setEvoChains, pokemonId]);

  useEffect(() => {
    const getPokemonID = async () => {
      const pokemonId = evoChains.map(async (chain) => {
        const pokemonFiltered = pokemons.filter(
          (pokemon) => pokemon.name === chain.species_name
        );

        if (!pokemonFiltered.length) {
          const pokemonData = await getPokemonByNameOrId(chain.species_name);
          pokemonFiltered.push(pokemonData);
        }

        return pokemonFiltered[0].id;
      });

      const allPromisesPokemon = await Promise.all(pokemonId);
      setPokeImgId(allPromisesPokemon);
    };
    getPokemonID();
  }, [evoChains, pokemons]);

  const imgUrl = (id) =>
    `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  if (evoChains.length <= 1)
    return (
      <div className={styles.evoContainer}>
        <p>Este pokemon não possui evoluções 😔</p>
      </div>
    );
  return (
    <div className={styles.evoContainer}>
      {evoChains.length <= 3 ? (
        <ul className={styles.evolutionList}>
          {evoChains.map((poke, index) => (
            <li key={poke.species_name} className={styles.evolutionItem}>
              <div className={styles.evolutionBoxImg}>
                <img src={imgUrl(pokeImgId[index])} alt={poke.species_name} />
              </div>
              <h5>{poke.species_name}</h5>
              {poke.min_level && (
                <span className={`${styles.level} ${color}`}>
                  Lv. {poke.min_level}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          {evoChains.map((poke, index) => {
            if (index <= 4 && index !== 0) {
              return <h5>{poke.species_name}</h5>;
            }

            if (index === 0) {
              return <h3>{poke.species_name}</h3>;
            }
          })}
        </>
      )}
    </div>
  );
};

export default Evolutions;
