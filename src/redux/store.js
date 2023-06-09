import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/slice'
import filter from './filter/slice'
import pizza from './pizza/slice'
export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
})
