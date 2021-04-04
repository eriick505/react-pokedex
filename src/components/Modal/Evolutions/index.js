import React, { useEffect, useState, useRef } from "react";

import styles from "./evolutions.module.css";
import { usePokemons } from "../../../Context/Pokedex";
import {
  getEvolutionChainsById,
  getPokemonByNameOrId,
  getPokemonImageById,
} from "../../../api";
import Chevron from "../../Svg/Chevron";

const Evolutions = ({ pokemonId, color }) => {
  const [evoChains, setEvoChains] = useState([]);
  const [pokeImgId, setPokeImgId] = useState([]);
  const [slideActive, setSlideActive] = useState(0);
  const [positionSlide, setPositionSlide] = useState(0);

  const contentRef = useRef();
  const { pokemons } = usePokemons();

  function slidePrev() {
    const isActiveGreaterThanZero = slideActive > 0;

    if (isActiveGreaterThanZero) setSlideActive(slideActive - 1);
  }

  function slideNext() {
    if (evoChains.length) {
      const isActiveMinorThanTotalItems = slideActive < evoChains.length - 2;

      if (isActiveMinorThanTotalItems) setSlideActive(slideActive + 1);
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      const { width } = contentRef.current.getBoundingClientRect();
      setPositionSlide(-(width * slideActive));
    }
  }, [slideActive]);

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
                <img
                  src={getPokemonImageById(pokeImgId[index])}
                  alt={poke.species_name}
                />
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
        <div className={styles.multipleEvolutions}>
          <div className={styles.mainPokemon}>
            {evoChains
              .filter((_, index) => index === 0)
              .map((poke, index) => (
                <div key={poke.species_name}>
                  <img
                    src={getPokemonImageById(pokeImgId[index])}
                    alt={poke.species_name}
                  />
                  <h5>{poke.species_name}</h5>
                </div>
              ))}
          </div>

          <div className={styles.slideContainer}>
            <div
              ref={contentRef}
              className={styles.content}
              style={{ transform: `translateX(${positionSlide}px)` }}
            >
              {evoChains
                .filter((_, index) => index !== 0)
                .map((poke, index) => (
                  <div key={poke.species_name} className={styles.item}>
                    <img
                      src={getPokemonImageById(pokeImgId[index + 1])}
                      alt={poke.species_name}
                    />
                    <h5>{poke.species_name}</h5>
                  </div>
                ))}
            </div>
            <nav className={styles.slideControl}>
              <button onClick={slidePrev}>
                <Chevron width={20} height={20} left={true} />
              </button>
              <button onClick={slideNext}>
                <Chevron width={20} height={20} />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evolutions;
