// mealsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    return response.data;
  } catch (error) {
    throw error; 
  }
});

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default mealsSlice.reducer;
