import React from 'react';
import ReactDOM from 'react-dom';
import { SearchProvider } from './Context/SearchPokemon';
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
