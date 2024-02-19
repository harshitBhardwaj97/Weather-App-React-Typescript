import { useState } from "react";
import { getWeatherInfo } from "./services/weather-service";
import WeatherDetails from "./components/WeatherDetails";
import { type WeatherData } from "../types.ts";

export default function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      fetchWeather(location);
    }
  };

  const fetchWeather = async (location: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getWeatherInfo(location);
      setWeatherData(response);
    } catch (error) {
      setError(
        "Error occured while fetching weather data, make sure correct location is entered!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid h-screen mx-auto bg-gray-200 max-w-7xl place-content-center">
        <main className="p-2 m-2 flex flex-col gap-3 items-center justify-center min-w-[400px] min-h-[420px] border border-black rounded-sm  bg-gray-400">
          <h1 className="text-3xl font-bold text-center">Weather App</h1>
          <input
            type="text"
            value={location}
            placeholder="Enter Location"
            className="px-2 py-4 text-xl bg-gray-300 border rounded-full shadow-lg focus:outline-none border-black/80 text-black/80"
            onChange={(e) => setLocation(e.target.value)}
            required
            data-cy="weather-input"
            onKeyDownCapture={handleEnterKeyPress}
          />

          {/* To be displayed when no location is entered */}
          {!location && (
            <div
              className="p-2 font-bold text-center text-red-700"
              data-cy="valid-location-message"
            >
              Enter valid location to get weather details
            </div>
          )}

          {/* Only show button when location is entered */}
          {location && (
            <button
              className="font-bold text-2xl px-4 py-2 rounded-3xl bg-gray-500 mx-auto w-[50%]
            hover:bg-red-500 hover:text-white ease-linear duration-150
            "
              onClick={() => fetchWeather(location)}
              data-cy="get-weather-button"
            >
              Get Weather
            </button>
          )}

          {/* While request is not resolved*/}
          {loading && (
            <div className="font-bold text-blue-800 underline">
              Loading Weather Details ...
            </div>
          )}

          {/* In case of Error */}
          {error && (
            <div
              className="text-red-700 font-bold w-[70%]"
              data-cy="error-message"
            >
              {error}
            </div>
          )}

          {/* Request Fetched Successfully, render the weather data */}
          {weatherData && !loading && !error && (
            <WeatherDetails {...weatherData} />
          )}
        </main>
      </div>
    </>
  );
}
