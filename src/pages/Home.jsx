import axios from 'axios'
import qs from 'qs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import { useDebounce } from '../hooks/useDebounce'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/filter/slice'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)
	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const debouncedSearchValue = useDebounce(searchValue, 250)
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const onClickCategory = id => {
		dispatch(setCategoryId(id))
	}
	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const fetchPizzas = () => {
		setIsLoading(true)
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `search=${searchValue}` : ''
		axios
			.get(
				`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = list.find(obj => obj.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			fetchPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, debouncedSearchValue, currentPage])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

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
