/* PROPERTIES */
const apiKey = process.env.WEATHER_API_KEY;

export const checkLocationIsActivated = async () => {
  let geoActive;
  let returnBool = false;

  await navigator.permissions.query({ name: 'geolocation' }).then((data) => {
    geoActive = data.state;

    if (geoActive === 'granted') returnBool = true;
  });

  return returnBool;
};

export const getUserPosition = async (position, setOutputData, inputData, setHasGeoLocation) => {
  if (!position) {
    // Fetch City Geo
    let getCityData = await getDataByParam({
      url: `https://api.openweathermap.org/geo/1.0/direct?q=${inputData}&limit=10&appid=${apiKey}`,
      errorMsg: 'Error beim Holen der City',
    });

    position = {
      coords: {
        latitude: getCityData[0].lat,
        longitude: getCityData[0].lon,
      },
    };
  }

  // get Data
  let weatherData = await getDataByParam({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`,
    errorMsg: 'Error Beim holen der Wetterdaten',
  });

  // // Fetch Forecast
  let forecast = await getDataByParam({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`,
    errorMsg: 'Error beim Holen der Forecasts',
  });

  if (weatherData && forecast) {
    setHasGeoLocation(true);

    setOutputData({
      weatherData,
      forecast,
      coords: {
        lan: position.coords.latitude,
        lon: position.coords.longitude,
      },
    });
  }
};

export const getDataByParam = async (fetchObj) => {
  return fetch(fetchObj.url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      alert.error(fetchObj.errorMsg, error);
    });
};
