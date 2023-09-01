import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchByCategory = createAsyncThunk("mealCat/fetchByCategory", async (selectedCategory) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert("Sorry, Error fetching meals");
    throw error;
  }
});

const initialState = {
  categories: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true;
        console.log("Fetching categories - pending");
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        console.log("Fetching categories - fulfilled");
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Fetching categories - rejected:");
      });
  },
});

export default categoriesSlice.reducer;