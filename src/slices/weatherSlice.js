import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const initialValue = {
  dataWeather: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialValue,
  reducers: {
    fetchDataWeatherStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    fetchDataWeatherSuccess: (state, action) => {
      state.dataWeather = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    fetchDataWeatherError: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const fetchDataWeather = ({ latitude, longitude }) => async (dispatch) => {
  dispatch(fetchDataWeatherStart());

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=231fb165247efed54ce8d01493ea57c8`
    );

    const resultData = response.data;

    const allIcons = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": cloud_icon,
      "03n": cloud_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    };

    const weatherData = {
      temperature: Math.floor(resultData.main.temp - 273.15),
      location: resultData.name,
      icon: allIcons[resultData.weather[0].icon] || clear_icon,
    };

    dispatch(fetchDataWeatherSuccess(weatherData));
  } catch (error) {
    const errorMessage = error.response && error.response.data
      ? error.response.data.message
      : "An error occurred while fetching weather data.";

    dispatch(fetchDataWeatherError(errorMessage));
  }
};

export const { fetchDataWeatherStart, fetchDataWeatherSuccess, fetchDataWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
