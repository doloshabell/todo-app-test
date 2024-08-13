import React, { useEffect, useState } from "react";
import { fetchDataWeather } from "../slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function WeatherContent() {
  const dispatch = useDispatch();
  const dataWeather = useSelector((state) => state.weather.dataWeather);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const isError = useSelector((state) => state.weather.isError);
  const errorMessage = useSelector((state) => state.weather.errorMessage);
  const [location, setLocation] = useState(null);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    setLocation({ latitude: crd.latitude, longitude: crd.longitude });
  }

  function errors(err) {
    console.warn(err)
    setLocation({ latitude: -6.2088, longitude: 106.8456 });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            setLocation({ latitude: -6.2088, longitude: 106.8456 });
          }
        });
    } else {
      setLocation({ latitude: -6.2088, longitude: 106.8456 });
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(fetchDataWeather(location));
    }
  }, [location, dispatch]);

  return (
    <div className="flex font-bold text-2xl gap-1 items-center bg-purple-300 p-2 rounded-xl text-slate-600">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {errorMessage}</p>}
      {dataWeather && (
        <>
          <img
            src={dataWeather.icon}
            alt="weather icon"
            className="w-16 h-16"
          />
          <div>
            <p>{dataWeather.temperature}°C</p>
            <h2>{dataWeather.location}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherContent;
