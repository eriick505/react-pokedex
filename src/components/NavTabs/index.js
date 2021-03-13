import React, { useState } from 'react'

import './navtabs.css'

const NavTabs = ({ children }) => {
	const [active, setActive] = useState(children[0].props.label)

	const handleClick = (label) => {
		setActive(label)
	}

	return (
		<div className="navTabs">
			<ul className="navMenu">
				{children.map(child => {
					const { label } = child.props
					return (
						<li 
							key={label} 
							className={label === active ? 'active' : ''}
							onClick={() => handleClick(label)}
						>
							{label}
						</li>
					)
				})}
			</ul>
			<div className="tabContent">
				{children.map(one => {
					const { label } = one.props

					return (
						<div 
							key={label}
							className={"item " + (label === active ? 'active' : '')}>
							{one}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default NavTabs