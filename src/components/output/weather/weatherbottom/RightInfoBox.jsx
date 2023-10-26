import PropTypes from 'prop-types';

const RightInfoBox = ({ sunRise, sunSet, minTemp, maxTemp }) => {
  return (
    <article className="today-info">
      <div className="precipitation">
        <span className="title">Sunrise: </span>
        <span className="value">{sunRise}</span>
      </div>
      <div className="humidity">
        <span className="title">Sunset: </span>
        <span className="value">{sunSet}</span>
      </div>
      <div className="wind">
        <span className="title">Min Temperature: </span>
        <span className="value">{minTemp}°C</span>
      </div>
      <div className="wind">
        <span className="title">Max Temperatur: </span>
        <span className="value">{maxTemp}°C</span>
      </div>
    </article>
  );
};

RightInfoBox.propTypes = {
  sunRise: PropTypes.string,
  sunSet: PropTypes.string,
  minTemp: PropTypes.string,
  maxTemp: PropTypes.string,
};

export default RightInfoBox;
