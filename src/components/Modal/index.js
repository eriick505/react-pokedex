import React from "react";

import "./modal.css";
import { pokemonTypesAsArray } from "../../utils";

import NavTabs from "../NavTabs";
import StatsInfo from "./StatsInfo";
import Moves from "./Moves";
import Evolutions from "./Evolutions";
import { getPokemonImageById } from "../../api";

const Modal = ({ pokemon, hideModal }) => {
  const { id, name, stats, moves } = pokemon;
  const typesInfo = pokemonTypesAsArray(pokemon);

  const pokemonImg = getPokemonImageById(id);

  return (
    <div className="modal">
      <div className={"modal__box animateSlideDown " + typesInfo[0]}>
        <button className="modal__close" onClick={() => hideModal()}>
          x
        </button>

        <div className="modal__content">
          <div className="overlay"></div>
          <div className="modal__header">
            <h2>{name}</h2>
            <span className="pokeId">#{id}</span>
            <ul className="types">
              {typesInfo.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
            <img src={pokemonImg} alt={name} />
          </div>

          <div className="modal__body">
            <NavTabs>
              <StatsInfo label="Base Stats" stats={stats} />
              <Moves label="Moves" moves={moves} color={typesInfo[0]} />
              <Evolutions
                label="Evolutions"
                pokemonId={id}
                color={typesInfo[0]}
              />
            </NavTabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
