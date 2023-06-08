import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/slice'
import filter from './filter/slice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
	},
})
