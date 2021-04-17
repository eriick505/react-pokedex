import React from 'react';
import Search from '../Svg/Search';
import { GET_POKEMON } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import { searchForm, formGroup } from './SearchBar.module.css';

export default function SearchBar({ setSearchPokemon, setFoundPokemon }) {
  const [searchInput, setSearchInput] = React.useState('');
  const { request, error } = useFetch();

  React.useEffect(() => {
    if (searchInput.length === 0) {
      setSearchPokemon(null);
      setFoundPokemon(false);
    }
  }, [searchInput, setSearchPokemon, setFoundPokemon]);

  async function handleSearch() {
    if (searchInput.length) {
      const { response, json } = await request(GET_POKEMON(searchInput));
      if (response.ok) {
        setSearchPokemon(json);
        setFoundPokemon(true);
      }
    }
  }

  return (
    <div className={searchForm}>
      <div className={formGroup}>
        <input
          type="text"
          id="search"
          placeholder=""
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
        />
        <label>Buscar Pokemon</label>
        <button onClick={handleSearch}>
          <Search />
        </button>
      </div>
      {error && <p>erro ao buscar pokemon</p>}
    </div>
  );
}
