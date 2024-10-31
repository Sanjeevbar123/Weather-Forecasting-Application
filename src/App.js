import React, { useState } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const apiKey = '04d8a0756c39636985286cff80dc29d8';

  const getWeather = async () => {
    try {
      if (!city) {
        setError('Please enter a city');
        return;
      }
      setError('');

      // Fetch current weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        setError(weatherData.message);
      } else {
        setWeatherData(weatherData);
      }

      // Fetch forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        setError(forecastData.message);
      } else {
        setForecastData(forecastData);
      }

    } catch (err) {
      setError('Unable to fetch weather data');
    }
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">Weather Forecast</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={getWeather}>
            Get Weather
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {weatherData && (
          <div className="card mt-3">
            <div className="card-body">
              <h3 className="card-title">{weatherData.name}</h3>
              <h4 className="card-subtitle mb-2 text-muted">
                {weatherData.weather[0].description}
              </h4>
              <p className="card-text">
                Temperature: {weatherData.main.temp} °C
              </p>
              <p className="card-text">
                Humidity: {weatherData.main.humidity} %
              </p>
              <p className="card-text">
                Wind Speed: {weatherData.wind.speed} m/s
              </p>
            </div>
          </div>
        )}
        {forecastData && (
          <div className="mt-5">
            <h2>5-Day Forecast:</h2>
            <div className="row">
              {forecastData.list.slice(0, 5).map((forecast, index) => (
                <div className="col-md-2" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5>{new Date(forecast.dt_txt).toLocaleDateString()}</h5>
                      <p>{forecast.weather[0].description}</p>
                      <p>Temp: {forecast.main.temp} °C</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer>
        <p>Weather data provided by OpenWeather</p>
      </footer>
    </div>
  );
}

export default App;

