import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'

export const store = configureStore({
	reducer: {
		filter,
	},
})
