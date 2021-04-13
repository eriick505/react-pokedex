import React, { useState } from 'react';

import { navMenu, active, tabContent } from './NavTabs.module.css';

const NavTabs = ({ children }) => {
  const [tabActive, setTabActive] = useState(children[0].props.label);

  const handleClick = label => {
    setTabActive(label);
  };

  return (
    <div>
      <ul className={navMenu}>
        {children.map(child => {
          const { label } = child.props;
          return (
            <li
              key={label}
              className={`${label === tabActive ? active : ''}`}
              onClick={() => handleClick(label)}
            >
              {label}
            </li>
          );
        })}
      </ul>
      <div className={tabContent}>
        {children.filter(one => {
          const { label } = one.props;

          return label === tabActive ? one : '';
        })}
      </div>
    </div>
  );
};

export default NavTabs;
