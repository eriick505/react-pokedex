import React from 'react'
import './statsinfo.css'

const StatsInfo = ({ stats }) => {
	const getTotalStats = stats.map(({ base_stat }) => base_stat)
	.reduce((acc, item) =>  acc + item , 0)

	return (
		<div className="baseStats">
			{ stats.map(info => {
				const { base_stat, stat } = info
				const removeHyphen = stat.name.replace('-', ' ')

				return (
					<div key={stat.name} className="statItem">
						<div className="info">
							<span>{removeHyphen}</span>
							<span>{base_stat}</span>
						</div>
						<div className="progress">
							<span 
								className={"bar " + (stat.name)} 
								style={{width: `calc(100% * ${base_stat}/255)`}}>
							</span>
						</div>
					</div>
				)
			}) }

			<div className="total">
				<span>Total</span>
				<span>{getTotalStats}</span>
			</div>
		</div>
	)
}

export default StatsInfo