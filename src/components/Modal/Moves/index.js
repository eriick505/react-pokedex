import React from 'react';

import { movesList } from './Moves.module.css';

const Moves = ({ moves, color }) => {
  return (
    <ul className={`${movesList} animateSlideRight`}>
      {moves.map(item => (
        <li key={item.move.name} className={color}>
          {item.move.name}
        </li>
      ))}
    </ul>
  );
};

export default Moves;
