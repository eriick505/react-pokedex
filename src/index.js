import React from 'react';
import ReactDOM from 'react-dom';
import PokedexProvider from './Context/Pokedex'
import App from './App';

ReactDOM.render(
  // <React.StrictMode>
    <PokedexProvider>
      <App />
    </PokedexProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
