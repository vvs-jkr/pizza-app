import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSliceState, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
      })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
