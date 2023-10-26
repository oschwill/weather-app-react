/* LEAFLET */
import { MapContainer, TileLayer } from 'react-leaflet';

/* CSS */
import { useContext, useEffect, useState } from 'react';
import './WeatherBottom.css';
import { DataContext } from '../../../pages/Home';
import LeftInfoBox from './weatherbottom/LeftInfoBox';
import RightInfoBox from './weatherbottom/RightInfoBox';

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
      <LeftInfoBox
        feelsLike={Math.floor(data.weatherData.main.feels_like)}
        humidity={data.weatherData.main.humidity}
        windSpeed={data.weatherData.wind.speed}
        pressure={data.weatherData.main.pressure}
      />
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
      <RightInfoBox
        sunRise={`${sun.riseHours}:${sun.riseMinutes}:${sun.sunriseSeconds}`}
        sunSet={` ${sun.sunsetHours}:${sun.sunsetMinutes}:${sun.sunsetSeconds}`}
        minTemp={Math.floor(data.weatherData.main.temp_min)}
        maxTemp={Math.floor(data.weatherData.main.temp_max)}
      />
    </article>
  );
};

export default WeatherBottom;
