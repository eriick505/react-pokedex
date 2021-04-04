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
  const [pokemonImage, setPokemonImage] = useState([]);
  const [slideActive, setSlideActive] = useState(0);
  const [positionSlide, setPositionSlide] = useState(0);
  const [loading, setLoading] = useState(false);

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
      try {
        setLoading(true);
        const data = await getEvolutionChainsById(pokemonId);
        if (!data.length)
          throw new Error("Não há dados das cadeias de evolução deste pokemon");
        setEvoChains(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    evolutionChain();
  }, [setEvoChains, pokemonId]);

  useEffect(() => {
    const getPokemonID = async () => {
      if (evoChains.length) {
        try {
          setLoading(true);
          const getEachId = async (chain) => {
            const pokemonFiltered = pokemons.filter(
              (pokemon) => pokemon.name === chain.species_name
            );

            if (!pokemonFiltered.length) {
              const pokemonData = await getPokemonByNameOrId(
                chain.species_name
              );
              pokemonFiltered.push(pokemonData);
            }

            return pokemonFiltered[0].id;
          };

          const allPromisesId = evoChains.map(getEachId);

          const allPokemonsID = await Promise.all(allPromisesId);
          setPokemonImage(allPokemonsID);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    };
    getPokemonID();
  }, [evoChains, pokemons]);

  return (
    <div className={styles.evoContainer}>
      {loading && <p>Carregando</p>}

      {!loading && evoChains.length <= 1 ? (
        <p>Este pokemon não possui evoluções 😔</p>
      ) : !loading && evoChains.length <= 3 ? (
        <ul className={styles.evolutionList}>
          {evoChains.map((poke, index) => (
            <li key={poke.species_name} className={styles.evolutionItem}>
              <div className={styles.evolutionBoxImg}>
                <img
                  src={getPokemonImageById(pokemonImage[index])}
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
                    src={getPokemonImageById(pokemonImage[index])}
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
                      src={getPokemonImageById(pokemonImage[index + 1])}
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
