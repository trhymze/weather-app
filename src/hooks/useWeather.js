import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch weather and forecast data.
 * @param {string} city - The city to fetch weather for.
 * @returns {object} - { data, loading, error }
 */

const useWeather = (city) => {
  const [data, setData] = useState({ weather: null, forecast: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );

        // Simulate loading
        setTimeout(() => {
          setData({ weather: weatherRes.data, forecast: forecastRes.data });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return { data, loading, error };
};

export default useWeather;
