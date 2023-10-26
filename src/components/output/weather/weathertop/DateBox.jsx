import PropTypes from 'prop-types';
import { Markup } from 'interweave';

const DateBox = ({ dayName, time, date, location, svg, windSpeed, windySvg }) => {
  return (
    <div className="date-container">
      <div>
        <h2 className="date-dayname">{dayName}</h2>
        <span className="location">{time}</span>
        <span className="date-day">{date}</span>
        <span className="location">{location}</span>
      </div>
      <div className="weather-svg">
        <Markup content={svg} />
        {windSpeed >= 5 ? <Markup content={windySvg} /> : ''}
      </div>
    </div>
  );
};

DateBox.propTypes = {
  dayName: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  svg: PropTypes.string,
  windSpeed: PropTypes.string,
  windySvg: PropTypes.string,
};

export default DateBox;
