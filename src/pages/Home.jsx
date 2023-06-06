import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'

const Home = searchValue => {
	const [items, setItems] = useState([])
	const [categoryId, setCategoryId] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	useEffect(() => {
		setIsLoading(true)

		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue.searchValue
			? `search=${searchValue.searchValue}`
			: ''

		fetch(
			`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		)
			.then(res => res.json())
			.then(data => setItems(data))
			.finally(() => setIsLoading(false))
		// window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue.searchValue, currentPage])

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))
	return (
		<>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={id => setCategoryId(id)}
				/>
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</>
	)
}

export default Home
