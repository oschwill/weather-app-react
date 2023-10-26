import PropTypes from 'prop-types';

/* CSS */
import './InputForm.css';

const InputForm = ({ onHandleUserInput, inputData, setInputData }) => {
  const handleInput = (value) => {
    setInputData(value);
  };

  return (
    <article className="weather-input">
      <form onSubmit={(e) => onHandleUserInput(e)}>
        <label htmlFor="city-value"></label>
        <input
          type="text"
          placeholder="your city..."
          className="city-value"
          id="city-value"
          value={inputData}
          onChange={(e) => handleInput(e.target.value)}
        />
        <button className="submit">
          <strong>GO</strong>
        </button>
      </form>
    </article>
  );
};

InputForm.propTypes = {
  onHandleUserInput: PropTypes.func,
  inputData: PropTypes.string,
  setInputData: PropTypes.func,
};

export default InputForm;
