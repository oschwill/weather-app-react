import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../pages/Home';
import { Markup } from 'interweave';

/* CSS */
import './WeatherTop.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const weatherImages = {
  icons: {
    sunny: '<i class="fa-solid fa-sun fa-beat" style="color: #fef600;"></i>',
    cloudy: '<i class="fa-solid fa-cloud fa-beat" style="color: #ffffff;"></i>',
    windy: '<i class="fa-solid fa-wind fa-shake" style="color: #0114ff;"></i>',
    rainy: '<i class="fa-solid fa-droplet fa-bounce" style="color: #0114ff;"></i>',
    bolt: '<i class="fa-solid fa-cloud-bolt fa-beat-fade" style="color: #696a79;"></i>',
    snowy: '<i class="fa-solid fa-snowflake fa-beat" style="color: hsl(177, 75%, 58%);"></i>',
    misty: '<i class="fa-solid fa-bacon fa-beat" style="color: #ffffff;"></i>',
  },
  backgroundImageClasses: {
    sunnyClass: 'sunny-weather',
    rainyClass: 'rainy-weather',
    cloudyClass: 'cloudy-weather',
    snowyClass: 'snowy-weather',
    mistyClass: 'misty-weather',
  },
};

const WeatherTop = () => {
  const [info, setInfo] = useState({});

  let data = useContext(DataContext);

  let dayCounter = 1;

  useEffect(() => {
    // set body background image and icon
    let svg, backgroundImageClass;
    switch (data.weatherData.weather[0].main) {
      case 'Clouds':
        svg = weatherImages.icons.cloudy;
        backgroundImageClass = weatherImages.backgroundImageClasses.cloudyClass;
        break;
      case 'Rain':
        svg = weatherImages.icons.rainy;
        backgroundImageClass = weatherImages.backgroundImageClasses.rainyClass;
        break;
      case 'Drizzle':
        svg = weatherImages.icons.rainy;
        backgroundImageClass = weatherImages.backgroundImageClasses.rainyClass;
        break;
      case 'Clear':
        svg = weatherImages.icons.sunny;
        backgroundImageClass = weatherImages.backgroundImageClasses.sunnyClass;
        break;
      case 'Snow':
        svg = weatherImages.icons.snowy;
        backgroundImageClass = weatherImages.backgroundImageClasses.snowyClass;
        break;
      case 'Mist':
        svg = weatherImages.icons.misty;
        backgroundImageClass = weatherImages.backgroundImageClasses.mistyClass;
        break;
      case 'Haze':
        svg = weatherImages.icons.misty;
        backgroundImageClass = weatherImages.backgroundImageClasses.mistyClass;
        break;

      default:
        break;
    }

    setInfo({
      day: new Date().getDate(),
      month: ('0' + (new Date().getMonth() + 1)).slice(-2),
      year: new Date().getFullYear(),
      dayCounter: 1,
      dayIndex: new Date().getDay(),
      svg,
      backgroundImageClass,
    });
  }, [data.weatherData.weather]);

  return (
    <>
      <article className={`weather-side ${info.backgroundImageClass} bg-style`}>
        <div className="weather-gradient"></div>
        <div className="date-container">
          <div>
            <h2 className="date-dayname">{days[info.dayIndex]}</h2>
            <span className="location">{info.time}</span>
            <span className="date-day">
              {info.month}/{info.day}/{info.year}
            </span>
            <span className="location">
              {data.weatherData.name}, {data.weatherData.sys.country}
            </span>
          </div>
          <div className="weather-svg">
            <Markup content={info.svg} />
            {data.weatherData.wind.speed >= 5 ? <Markup content={weatherImages.icons.windy} /> : ''}
          </div>
        </div>
        <div className="weather-container">
          <h1 className="weather-temp">{Math.floor(data.weatherData.main.temp)}°C </h1>
          <h3 className="weather-desc">{data.weatherData.weather[0].description}</h3>
        </div>
        <div className="forecast">
          {data.forecast &&
            data.forecast.list.map((val) => {
              if (
                new Date(val.dt_txt).getDate() === info.day + dayCounter &&
                new Date(val.dt_txt).getHours() === 15 &&
                dayCounter <= 3
              ) {
                dayCounter++;
                return (
                  <div key={crypto.randomUUID()}>
                    <p>
                      {info.month}/{info.day + dayCounter - 1}/{info.year}
                    </p>
                    <h2>{Math.floor(val.main.temp)}°C</h2>
                    <p>{val.weather[0].description}</p>
                  </div>
                );
              } else {
                return '';
              }
            })}
        </div>
      </article>
    </>
  );
};

export default WeatherTop;
