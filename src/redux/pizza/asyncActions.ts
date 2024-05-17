import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://660864a1a2a5dd477b146fb6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )

    return data
  }
)
