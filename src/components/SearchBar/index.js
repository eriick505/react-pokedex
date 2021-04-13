import React from 'react';
import { searchForm } from './SearchBar.module.css';

export default function SearchBar() {
  const handleChange = e => {
    const inputValue = e.target.value;
    console.log(inputValue);
  };

  return (
    <div className={searchForm}>
      <input
        type="text"
        id="search"
        placeholder="Buscar Pokemon"
        onChange={handleChange}
      />
    </div>
  );
}
