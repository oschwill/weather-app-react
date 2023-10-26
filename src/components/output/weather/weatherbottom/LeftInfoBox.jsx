import PropTypes from 'prop-types';

const LeftInfoBox = ({ feelsLike, humidity, windSpeed, pressure }) => {
  return (
    <article className="today-info">
      <div className="precipitation">
        <span className="title">Feels Like: </span>
        <span className="value">{feelsLike}°C</span>
      </div>
      <div className="humidity">
        <span className="title">Humidity: </span>
        <span className="value">{humidity}%</span>
      </div>
      <div className="wind">
        <span className="title">Wind Speed: </span>
        <span className="value">{windSpeed} km/h</span>
      </div>
      <div className="wind">
        <span className="title">Pressure: </span>
        <span className="value">{pressure} hPa</span>
      </div>
    </article>
  );
};

LeftInfoBox.propTypes = {
  feelsLike: PropTypes.string,
  humidity: PropTypes.string,
  windSpeed: PropTypes.string,
  pressure: PropTypes.string,
};

export default LeftInfoBox;
