import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { useDebounce } from '../hooks/useDebounce'

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)
	const dispatch = useDispatch()
	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const debouncedSearchValue = useDebounce(searchValue, 250)

	const onClickCategory = id => {
		dispatch(setCategoryId(id))
	}
	
	useEffect(() => {
		setIsLoading(true)

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue
			? `search=${searchValue}`
			: ''

		axios.get(
			`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		).then(res => {
			setItems(res.data)
			setIsLoading(false)
		})
		// window.scrollTo(0, 0)
	}, [categoryId, sort.sortProperty, debouncedSearchValue ,currentPage])

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

		const onChangePage = (number) => {
			dispatch(setCurrentPage(number))

		}

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
}

export default Home
