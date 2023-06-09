import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get(
			`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: '', //loading | success | error
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading'
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = 'success'
			state.items = action.payload
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = 'error'
			state.items = []
		})
	},
})

export const selectPizza = state => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
