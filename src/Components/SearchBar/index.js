import React from 'react';
import Search from '../Svg/Search';
import { searchForm, formGroup } from './SearchBar.module.css';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');

  function handleChange({ target }) {
    setSearch(target.value);
    if (target.value.length === 0) {
      console.log('vazio');
    }
  }

  return (
    <div className={searchForm}>
      <div className={formGroup}>
        <input
          type="text"
          id="search"
          placeholder=""
          value={search}
          onChange={handleChange}
        />
        <label>Buscar Pokemon</label>
        <button>
          <Search />
        </button>
      </div>
    </div>
  );
}
