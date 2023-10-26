/* LEAFLET */
import { MapContainer, TileLayer } from 'react-leaflet';

/* CSS */
import { useContext, useEffect, useState } from 'react';
import './WeatherBottom.css';
import { DataContext } from '../../../pages/Home';

const WeatherBottom = () => {
  const [sun, setSun] = useState({});
  const mapZoomLevel = 12;

  let data = useContext(DataContext);

  useEffect(() => {
    setSun({
      riseHours: ('0' + new Date(data.weatherData.sys.sunrise * 1000).getUTCHours()).slice(-2),
      riseMinutes: ('0' + new Date(data.weatherData.sys.sunrise * 1000).getUTCMinutes()).slice(-2),
      riseSeconds: ('0' + new Date(data.weatherData.sys.sunrise * 1000).getUTCSeconds()).slice(-2),
      sunsetHours: ('0' + new Date(data.weatherData.sys.sunset * 1000).getUTCHours()).slice(-2),
      sunsetMinutes: ('0' + new Date(data.weatherData.sys.sunset * 1000).getUTCMinutes()).slice(-2),
      sunsetSeconds: ('0' + new Date(data.weatherData.sys.sunset * 1000).getUTCSeconds()).slice(-2),
    });
  }, [data.weatherData.sys.sunrise, data.weatherData.sys.sunset]);

  return (
    <article className="info-side">
      <div className="today-info">
        <div className="precipitation">
          <span className="title">Feels Like: </span>
          <span className="value">{Math.floor(data.weatherData.main.feels_like)}°C</span>
        </div>
        <div className="humidity">
          <span className="title">Humidity: </span>
          <span className="value">{data.weatherData.main.humidity}%</span>
        </div>
        <div className="wind">
          <span className="title">Wind Speed: </span>
          <span className="value">{data.weatherData.wind.speed} km/h</span>
        </div>
        <div className="wind">
          <span className="title">Pressure: </span>
          <span className="value">{data.weatherData.main.pressure} hPa</span>
        </div>
      </div>
      {/* <div id="map"></div> */}
      <MapContainer
        center={[data.coords.lan, data.coords.lon]}
        zoom={mapZoomLevel}
        scrollWheelZoom={false}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <article className="today-info">
        <div className="precipitation">
          <span className="title">Sunrise: </span>
          <span className="value">
            {sun.riseHours}:{sun.riseMinutes}:{sun.sunriseSeconds}
          </span>
        </div>
        <div className="humidity">
          <span className="title">Sunset: </span>
          <span className="value">
            {sun.sunsetHours}:{sun.sunsetMinutes}:{sun.sunsetSeconds}
          </span>
        </div>
        <div className="wind">
          <span className="title">Min Temperature: </span>
          <span className="value">{Math.floor(data.weatherData.main.temp_min)}°C</span>
        </div>
        <div className="wind">
          <span className="title">Max Temperatur: </span>
          <span className="value">{Math.floor(data.weatherData.main.temp_max)}°C</span>
        </div>
      </article>
    </article>
  );
};

export default WeatherBottom;
