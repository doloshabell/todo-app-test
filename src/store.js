import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import weatherReducer from "./slices/weatherSlice";

const store = configureStore({
  reducer: { todo: todoReducer, weather: weatherReducer },
});

export default store;
