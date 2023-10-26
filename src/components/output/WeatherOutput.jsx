import PropTypes from 'prop-types';

import WeatherBottom from './weather/WeatherBottom';
import WeatherTop from './weather/WeatherTop';

const WeatherOutput = ({ onSetWrapperClass }) => {
  return (
    <>
      <WeatherTop onSetWrapperClass={onSetWrapperClass} />
      <WeatherBottom />
    </>
  );
};

WeatherOutput.propTypes = {
  onSetWrapperClass: PropTypes.func,
};

export default WeatherOutput;
