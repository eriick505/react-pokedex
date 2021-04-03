import React from "react";

import { usePokemons } from "./Context/Pokedex";

import Header from "./components/Header";
import Pokedex from "./components/Pokedex";
import Footer from "./components/Footer";
import { getAllPokemons } from "./api";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const { pokemons, setPokemons } = usePokemons();

  React.useEffect(() => {
    async function setPokemonsIntoPokedex() {
      try {
        setLoading(true);
        const allPokemons = await getAllPokemons();
        setPokemons(allPokemons);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    setPokemonsIntoPokedex();
  }, [setPokemons]);

  return (
    <>
      <Header />
      {loading ? (
        <h5 style={{ textAlign: "center" }}>CARREGANDO</h5>
      ) : (
        pokemons.length && <Pokedex pokemonData={pokemons} />
      )}
      <Footer />
    </>
  );
}
export default App;
