// store.js
import { configureStore } from '@reduxjs/toolkit';
import mealsReducer from './mealsSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    meals: mealsReducer,
    categories : categoryReducer,
  },
});

export default store;
