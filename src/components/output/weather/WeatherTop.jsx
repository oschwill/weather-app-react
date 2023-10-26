import PropTypes from 'prop-types';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../pages/Home';

/* CSS */
import './WeatherTop.css';
import ForecastBox from './weathertop/ForecastBox';
import DateBox from './weathertop/DateBox';
import WeatherBox from './weathertop/WeatherBox';

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

const WeatherTop = ({ onSetWrapperClass }) => {
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
      time: new Date()
        .toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
        })
        .concat(`${new Date().getHours() >= 12 ? ' PM' : ' AM'}`),
      day: new Date().getDate(),
      month: ('0' + (new Date().getMonth() + 1)).slice(-2),
      year: new Date().getFullYear(),
      dayCounter: 1,
      dayIndex: new Date().getDay(),
      svg,
      backgroundImageClass,
    });

    onSetWrapperClass(backgroundImageClass);
  }, [data.weatherData.weather, onSetWrapperClass]);

  return (
    <>
      <article className={`weather-side ${info.backgroundImageClass} bg-style`}>
        <div className="weather-gradient"></div>
        <DateBox
          dayName={days[info.dayIndex]}
          time={info.time}
          date={`${info.month}/${info.day}/${info.year}`}
          location={`${data.weatherData.name}, ${data.weatherData.sys.country}`}
          svg={info.svg}
          windSpeed={data.weatherData.wind.speed}
          windySvg={weatherImages.icons.windy}
        />
        <WeatherBox
          temp={Math.floor(data.weatherData.main.temp)}
          description={data.weatherData.weather[0].description}
        />
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
                  <ForecastBox
                    key={crypto.randomUUID()}
                    month={info.month}
                    day={info.day + dayCounter - 1}
                    year={info.year}
                    temp={Math.floor(val.main.temp)}
                    description={val.weather[0].description}
                  />
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

WeatherTop.propTypes = {
  onSetWrapperClass: PropTypes.func,
};

export default WeatherTop;
