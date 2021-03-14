import React from 'react'

import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Criado por <a 
          href="https://github.com/eriick505" 
          target="_blank" 
          rel="noopener noreferrer">
          eriick505
        </a>
      </span>
      <span>Dados utilizados <a 
          href="https://pokeapi.co/" 
          target="_blank" 
          rel="noopener noreferrer">
          PokeAPI
        </a>
      </span>
    </footer>
  )
}

export default Footer
