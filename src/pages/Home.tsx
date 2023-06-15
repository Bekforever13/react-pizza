import qs from 'qs'
import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import { useDebounce } from '../hooks/useDebounce'
import { useAppDispatch } from '../redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter'
import { selectFilter } from '../redux/filter/selectors'
import { selectPizza } from '../redux/pizza/selectors'
import { fetchPizzas } from '../redux/pizza/slice'

const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const debouncedSearchValue = useDebounce(searchValue, 250)
	const { items, status } = useSelector(selectPizza)

	const onClickCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])
	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getPizzas = async () => {
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		)
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = list.find(obj => obj.sortProperty === params.sortBy)

			dispatch(
				setFilters({
					searchValue: String(params.search),
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || list[0],
				})
			)
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			getPizzas()
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

	const pizzas = items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onClickCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка</h2>
					<p>
						К сожалению, не удалось загрузить пиццы. Попробуйте повторить
						попытку позже
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
}

export default Home
