import PropTypes from 'prop-types';

const ForecastBox = ({ month, day, year, temp, description }) => {
  return (
    <div>
      <p>
        {month}/{day}/{year}
      </p>
      <h2>{temp}°C</h2>
      <p>{description}</p>
    </div>
  );
};

ForecastBox.propTypes = {
  month: PropTypes.string,
  day: PropTypes.string,
  year: PropTypes.string,
  temp: PropTypes.string,
  description: PropTypes.string,
};

export default ForecastBox;
