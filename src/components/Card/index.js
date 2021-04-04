import React from "react";
import { getPokemonImageById } from "../../api";
import { pokemonTypesAsArray } from "../../utils";
import "./card.css";

const Card = ({ pokemon, showModal, getPokemon }) => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  function handleClick() {
    showModal();
    getPokemon(pokemon);
  }

  const types = pokemonTypesAsArray(pokemon);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(getPokemonImageById(pokemon.id));
        if (!response.ok) throw new Error("Imagem não carregada");
        setImage(response.url);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [pokemon.id]);

  return (
    <li className={"card " + types[0]} onClick={() => handleClick()}>
      <div className="content">
        <h2>{pokemon.name}</h2>
        <ul className="types">
          {types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <span className="id">#{pokemon.id}</span>
      </div>
      <div className="thumb">
        {loading ? (
          "carregando"
        ) : (
          <img className="card-image" src={image} alt={pokemon.name} />
        )}
      </div>
    </li>
  );
};

export default Card;
