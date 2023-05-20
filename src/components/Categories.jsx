import React from 'react'

const Categories = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	const onClickCategory = index => {
		setActiveIndex(index)
	}

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, index) => {
					return (
						<li
							key={index}
							onClick={() => onClickCategory(index)}
							className={activeIndex === index ? 'active' : ''}
						>
							{item}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Categories
