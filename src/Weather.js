import React from "react";
import useWeather from "./hooks/useWeather";
import Loader from "./components/Loader";
import { toast } from "react-toastify";

const Weather = () => {
  const city = "Benin City";
  const { data, loading, error } = useWeather(city);

  if (loading) return <Loader />;
  // if (error) return <div>{error}</div>;
  if (error) {
    toast.error(error);
    return null; // Prevent crashing render after toast
  }

  const { weather, forecast } = data;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {/* Current Weather */}
      <h1>{weather.name}</h1>
      <p style={{ fontSize: "2rem" }}>{weather.main.temp}°C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
        style={{ width: "100px" }}
      />
      <p style={{ textTransform: "capitalize" }}>
        {weather.weather[0].description}
      </p>

      {/* 5-Day Forecast */}
      <h2 style={{ marginTop: "2rem" }}>5-Day Forecast</h2>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {forecast.list.map(
          (item, index) =>
            index % 8 === 0 && (
              <div
                key={index}
                style={{
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "120px",
                }}
              >
                <h4>{new Date(item.dt * 1000).toLocaleDateString()}</h4>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Forecast icon"
                />
                <p style={{ margin: "5px 0" }}>{item.main.temp}°C</p>
                <p style={{ fontSize: "0.8rem", textTransform: "capitalize" }}>
                  {item.weather[0].description}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Weather;
