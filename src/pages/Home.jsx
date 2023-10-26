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

  useEffect(() => {
    // const returnBool = checkLocationIsActivated();
    checkLocationIsActivated().then((hasGeo) => {
      setHasGeoLocation(hasGeo);

      if (!hasGeoLocation) {
        return;
      }

      navigator.geolocation.getCurrentPosition(function (position) {
        getUserPosition(position, setOutputData);
        setHasGeoLocation(true);
      });
    });
  }, [hasGeoLocation]);

  const handleUserInput = (event) => {
    event.preventDefault();
    //
    if (inputData === '') {
      console.log('no input');
      return;
    }
    console.log(event.target.value);
  };

  return (
    <div id="wrapper">
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
              <Clue />
              <Loader />
            </div>
          )}
          {hasGeoLocation && outputData && (
            <DataContext.Provider value={outputData}>
              <WeatherOutput />
            </DataContext.Provider>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
