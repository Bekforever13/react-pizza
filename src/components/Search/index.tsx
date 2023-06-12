import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/filter/slice'
import styles from './Search.module.scss'

const Search: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState<string>('')
	const dispatch = useDispatch()

	const onClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current?.focus()
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		dispatch(setSearchValue(e.target.value))
	}

	return (
		<div className={styles.root}>
			<i className={`bx bx-search ${styles.icon}`}></i>
			<input
				ref={inputRef}
				value={value}
				onChange={onChange}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value ? (
				<svg
					onClick={onClear}
					className={styles.clear}
					height='48'
					viewBox='0 0 48 48'
					width='48'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z' />
					<path d='M0 0h48v48H0z' fill='none' />
				</svg>
			) : (
				''
			)}
		</div>
	)
}

export default Search
