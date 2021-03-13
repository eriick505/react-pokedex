import React from 'react'

import './moves.css'

const Moves = ({ moves, color }) => {
  return (
    <ul className="movesList">
      {moves.map(item => (
        <li key={item.move.name} className={color}>
          {item.move.name}
        </li>
      ))}
    </ul>
  )
}

export default Moves