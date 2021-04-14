import React from 'react';
import { pokemonTypesAsArray, getPokemonImageById } from '../../utils';

import NavTabs from '../NavTabs';
import StatsInfo from './StatsInfo';
import Moves from './Moves';
import Evolutions from './Evolutions';

import {
  modal,
  modal__box,
  animateScaleUp,
  modal__close,
  modal__content,
  overlay,
  modal__header,
  pokeId,
  typesPill,
  modal__body,
} from './Modal.module.css';

function Modal({ pokemonModal: pokemon, setPokemonModal }) {
  const { id, name, stats, moves } = pokemon;
  const types = pokemonTypesAsArray(pokemon);
  const colorPrimary = types[0];
  const pokemonImg = getPokemonImageById(id);

  function closeModal() {
    setPokemonModal(null);
  }

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) closeModal();
  }

  return (
    <div className={modal} onClick={handleOutsideClick}>
      <div className={`${modal__box} ${animateScaleUp} ${colorPrimary}`}>
        <button className={modal__close} onClick={closeModal}>
          x
        </button>

        <div className={modal__content}>
          <div className={overlay}></div>
          <div className={modal__header}>
            <h2>{name}</h2>
            <span className={pokeId}>#{id}</span>
            <ul className={typesPill}>
              {types.map((type, index) => (
                <li key={`${type}-${index}`} className={type}>
                  {type}
                </li>
              ))}
            </ul>
            <img src={pokemonImg} alt={name} />
          </div>

          <div className={modal__body}>
            <NavTabs>
              <StatsInfo label="Base Stats" stats={stats} />
              <Moves label="Moves" moves={moves} color={colorPrimary} />
              <Evolutions
                label="Evolutions"
                pokemonId={id}
                color={colorPrimary}
              />
            </NavTabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
