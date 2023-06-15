import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cart from './cart'
import filter from './filter'
import pizza from './pizza/slice'
export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
