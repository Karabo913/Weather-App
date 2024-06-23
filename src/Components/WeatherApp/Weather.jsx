import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6321dd11a97e74ebe71c6e704ed21a56`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
        className="weather-input"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button className="weather-button"  type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p className="weather-info-item">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-info-item" >Description: {weatherData.weather[0].description}</p>
          <p className="weather-info-item">Feels like : {weatherData.main.feels_like}°C</p>
          <p className="weather-info-item">Humidity : {weatherData.main.humidity}%</p>
          <p className="weather-info-item">Pressure : {weatherData.main.pressure}</p>
          <p className="weather-info-item">Wind Speed : {weatherData.wind.speed}m/s</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;