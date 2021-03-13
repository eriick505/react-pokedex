import React from 'react'

import './navtabs.css'

const NavTabs = ({ children }) => {
	return (
		<div className="navTabs">
			<ul className="navMenu">
			  <li className="active">Stats</li>
			  <li>Moves</li>
			  <li>Evolutions</li>
			</ul>
		
			<div className="tabContent">
				{children}
			</div>
		</div>
	)
}

export default NavTabs