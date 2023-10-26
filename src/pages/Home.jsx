import { createContext, useEffect, useState } from 'react';
import InputForm from '../components/input/InputForm';
import Clue from '../components/output/Clue';
import { checkLocationIsActivated, getUserPosition } from '../functions/geoLocation';
import Loader from '../components/Loader';
import WeatherOutput from '../components/output/WeatherOutput';

export const DataContext = createContext(null);

const Home = () => {
  const [hasGeoLocation, setHasGeoLocation] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [clue, setClue] = useState(false);
  const [wrapperClass, setWrapperClass] = useState('');

  useEffect(() => {
    checkLocationIsActivated().then((hasGeo) => {
      setClue(true);

      if (!hasGeo) {
        return;
      }

      navigator.geolocation.getCurrentPosition(function (position) {
        getUserPosition(position, setOutputData, null, setHasGeoLocation);
        setClue(false);
      });
    });
  }, []);

  const handleUserInput = async (event) => {
    event.preventDefault();
    setHasGeoLocation(false);

    // no data
    if (inputData === '') {
      console.log('no input');
      return;
    }

    getUserPosition(null, setOutputData, inputData, setHasGeoLocation);
  };

  const handleWrapperClass = (value) => setWrapperClass(value);

  return (
    <div id="wrapper" className={`bg-style ${wrapperClass ? wrapperClass : ''} `}>
      <main>
        <h1 className="intro">Weather App</h1>
        <section className="container">
          <InputForm
            onHandleUserInput={handleUserInput}
            inputData={inputData}
            setInputData={setInputData}
          />
          {!hasGeoLocation && (
            <div>
              {clue && <Clue />}
              <Loader />
            </div>
          )}
          {hasGeoLocation && outputData && (
            <DataContext.Provider value={outputData}>
              <WeatherOutput onSetWrapperClass={handleWrapperClass} />
            </DataContext.Provider>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
