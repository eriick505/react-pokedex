import React from 'react'
import { pokemonTypesAsArray } from '../../utils'
import './modal.css'

const Modal = ({ modalIsOpen, hideModal, pokemon }) => {
  const showHideModal = modalIsOpen ? 'popup animateSlideDown' : ''

  const { id, name, stats } = pokemon

  const typesInfo = pokemonTypesAsArray(pokemon)

  const getTotalStats = stats.map(({ base_stat }) => base_stat)
  .reduce((acc, item) =>  acc + item , 0)

  const pokemonImg = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

  return (
    <div className={showHideModal}>
      <div className={"popup__box " + (typesInfo[0])}>
        <button className="popup__close" onClick={() => hideModal()}>
          x
        </button>
        
        <div className="popup__content"> 
          <div className="popup__header">
            <h2>{name}</h2>
            <span className="pokeId">#{id}</span>
            <ul className="types">
              { typesInfo.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
            <img src={pokemonImg} alt={name} />
          </div>
    
          <div className="popup__body">
            <ul className="menu">
              <li className="active">Stats</li>
              <li>Moves</li>
              <li>Evolutions</li>
            </ul>
        
            <div className="tables">
              <table>
                <tbody>
                  { stats.map(({ base_stat, stat }, index) => {
                    const resumeName = stat.name.replace('special', 'sp')
                    
                    return ( 
                      <tr key={index}>
                        <td>{resumeName}</td>
                        <td>{base_stat}</td>
                        <td>
                          <div className="skillbar">
                            <span 
                              className={"bar " + (stat.name)} 
                              style={{width: `calc(100% * ${base_stat}/255)`}}>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  }) }
                  <tr>
                    <td>TOTAL</td>
                    <td>{getTotalStats}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal