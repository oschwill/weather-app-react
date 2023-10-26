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

export const getUserPosition = async (position, setOutputData) => {
  // get Data
  let weatherData = await getDataByParam({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`,
    errorMsg: 'Error Beim holen der Wetterdaten',
  });

  // // Fetch Forecast
  let forecast = await getDataByParam({
    url: `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`,
    errorMsg: 'Error beim Holen der Forecasts',
  });

  if (weatherData && forecast) {
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

const getDataByParam = async (fetchObj) => {
  return fetch(fetchObj.url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      alert.error(fetchObj.errorMsg, error);
    });
};
