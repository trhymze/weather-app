import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // State for current weather data
  const [forecastData, setForecastData] = useState(null); // State for 5-day forecast data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading state
  const city = "Benin City"; // You can change the city here

  // Fetch current weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        setWeatherData(response.data); // Store current weather data
      } catch (err) {
        setError("Error fetching current weather data");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchWeather();
  }, [city]); // Dependency array ensures this runs when city changes

  // Fetch 5-day weather forecast
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        setForecastData(response.data); // Store 5-day forecast data
      } catch (err) {
        setError("Error fetching 5-day forecast data");
      }
    };

    fetchForecast();
  }, [city]); // Dependency array ensures this runs when city changes

  if (loading) return <div>Loading...</div>; // Show loading message while data is being fetched
  if (error) return <div>{error}</div>; // Show error message if there is an issue fetching data

  return (
    <div>
      <h1>{weatherData.name}</h1>
      <p>{weatherData.main.temp}°C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt="Weather icon"
      />
      <p>{weatherData.weather[0].description}</p>

      <h2>5-Day Forecast</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {forecastData &&
          forecastData.list &&
          forecastData.list.map((forecast, index) => {
            // Render a forecast for every 8 hours, so we pick every 8th item (assuming data is returned every 3 hours)
            if (index % 8 === 0) {
              return (
                <div key={index} style={{ margin: "0 10px" }}>
                  <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                  <p>{forecast.main.temp}°C</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt="Forecast icon"
                  />
                  <p>{forecast.weather[0].description}</p>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default Weather;
