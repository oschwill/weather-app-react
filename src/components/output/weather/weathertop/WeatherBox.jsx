import PropTypes from 'prop-types';

const WeatherBox = ({ temp, description }) => {
  return (
    <div className="weather-container">
      <h1 className="weather-temp">{temp}°C </h1>
      <h3 className="weather-desc">{description}</h3>
    </div>
  );
};

WeatherBox.propTypes = {
  temp: PropTypes.string,
  description: PropTypes.string,
};

export default WeatherBox;
