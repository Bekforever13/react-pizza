import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItem, PizzaSliceState, SearchPizzaParams, Status } from './types'

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<PizzaItem[]>(
			`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		)
		return data
	}
)

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.items = action.payload
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR
			state.items = []
		})
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
