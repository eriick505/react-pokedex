import React from 'react'

import './modal.css'
import { pokemonTypesAsArray } from '../../utils'

import NavTabs from '../NavTabs'

const Modal = ({ modalIsOpen, hideModal, pokemon }) => {
  const showHideModal = modalIsOpen ? 'modal animateSlideDown' : ''
  const { id, name, stats } = pokemon
  const typesInfo = pokemonTypesAsArray(pokemon)
  const pokemonImg = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

  return (
    <div className={showHideModal}>
      <div className={"modal__box " + (typesInfo[0])}>
        <button className="modal__close" onClick={() => hideModal()}>
          x
        </button>
        
        <div className="modal__content"> 
          <div className="modal__header">
            <h2>{name}</h2>
            <span className="pokeId">#{id}</span>
            <ul className="types">
              { typesInfo.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
            <img src={pokemonImg} alt={name} />
          </div>
    
          <div className="modal__body">
            <NavTabs>
              <div>oi</div>
              <div>oi</div>
              <div>oi</div>
            </NavTabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal