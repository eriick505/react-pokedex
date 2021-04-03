import React, { useState } from "react";

import "./pokedex.css";
import Card from "../Card";
import Modal from "../Modal";

export default function Pokedex({ pokemonData }) {
  const [show, setShow] = useState(false);
  const [pokemonClicked, setPokemonClicked] = useState([]);

  const toggleModal = () => {
    setShow((show) => !show);
  };

  const getPokemon = (pokemon) => {
    setPokemonClicked(pokemon);
  };

  return (
    <div className="container">
      <ul data-js="pokedex" className="pokedex">
        {pokemonData.map((item) => (
          <Card
            key={item.id}
            pokemon={item}
            showModal={toggleModal}
            getPokemon={getPokemon}
          />
        ))}
      </ul>

      {show && (
        <Modal
          modalIsOpen={show}
          hideModal={toggleModal}
          pokemon={pokemonClicked}
        />
      )}
    </div>
  );
}
