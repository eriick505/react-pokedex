import React from 'react';
import SearchBar from '../SearchBar';
import logoPokemon from '../../assets/img/pokemon.png';
import { header, logo, searchContainer } from './Header.module.css';

export default function Header() {
  return (
    <header className={header}>
      <div className={logo}>
        <img src={logoPokemon} alt="logo" />
      </div>

      <div className={searchContainer}>
        <SearchBar />
      </div>
    </header>
  );
}
