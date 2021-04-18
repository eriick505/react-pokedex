import React from 'react';

const SearchContext = React.createContext();

function SearchProvider({ children }) {
  const [searchPokemon, setSearchPokemon] = React.useState(null);
  const [foundPokemon, setFoundPokemon] = React.useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchPokemon,
        setSearchPokemon,
        foundPokemon,
        setFoundPokemon,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
