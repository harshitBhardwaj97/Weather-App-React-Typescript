import axios from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const getWeatherInfo = async (cityName: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/?q=${cityName}&units=metric&appid=${
      import.meta.env.VITE_APP_API_KEY
    }`
  );
  return data;
};
