const getLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  );

  const r = await response.json();

  return r[0].woeid;
};

const getWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`
  );

  let { consolidated_weather } = await response.json();
  let { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    weather: weather_state_name,
    temperature: the_temp
  };
};

export const fetchData = async location => {
  const id = await getLocationId(location);
  return getWeather(id);
};
