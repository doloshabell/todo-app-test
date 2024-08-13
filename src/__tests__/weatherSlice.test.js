import { configureStore } from "@reduxjs/toolkit";
import weatherReducer, {
  fetchDataWeatherStart,
  fetchDataWeatherSuccess,
  fetchDataWeatherError,
} from "../slices/weatherSlice";

describe("weatherSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { weather: weatherReducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }),
    });

    store.dispatch = jest.fn();
  });

  it("should handle fetchDataWeatherStart action", () => {
    const initialState = {
      dataWeather: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };

    const expectedState = {
      dataWeather: null,
      isLoading: true,
      isError: false,
      errorMessage: "",
    };

    expect(weatherReducer(initialState, fetchDataWeatherStart())).toEqual(
      expectedState
    );
  });

  it("should handle fetchDataWeatherSuccess action", () => {
    const payload = {
      temperature: 30,
      location: "Jakarta",
      icon: "some-icon-url",
    };

    const initialState = {
      dataWeather: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };

    const expectedState = {
      dataWeather: payload,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };

    expect(
      weatherReducer(initialState, fetchDataWeatherSuccess(payload))
    ).toEqual(expectedState);
  });

  it("should handle fetchDataWeatherError action", () => {
    const errorMessage = "Failed to fetch data";

    const initialState = {
      dataWeather: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };

    const expectedState = {
      dataWeather: null,
      isLoading: false,
      isError: true,
      errorMessage,
    };

    expect(
      weatherReducer(initialState, fetchDataWeatherError(errorMessage))
    ).toEqual(expectedState);
  });
});
