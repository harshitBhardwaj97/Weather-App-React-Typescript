import { type WeatherData } from "../../types.ts";

export default function WeatherDetails(props: WeatherData) {
  const { main, name, sys, weather, wind } = props;

  return (
    <div
      className="flex items-center gap-2 p-2 relative bg-gray-300 rounded-md shadow-xl min-w-[360px]"
      data-cy="weather-component"
    >
      <div className="flex flex-col items-center flex-1 h-full gap-2 justify-evenly">
        {/* Location Details */}
        <h2>
          <span className="text-xl font-bold">{name}</span>, {sys.country}{" "}
          <br />
          {weather[0].description}
        </h2>
        <div>
          <p>
            {/* Temparature */}
            <span className="text-3xl font-bold">{main.temp} °C</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center flex-1 gap-2 justify-evenly">
        {/* Weather Icon */}
        <img
          className="rounded-lg"
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <div className="flex flex-col items-center text-sm">
          <p>
            <span className="italic">Feels Like</span> :{" "}
            <span className="font-bold">{main.feels_like} °C</span>{" "}
          </p>
          <p>
            <span className="italic">Humidity</span> :{" "}
            <span className="font-bold">{main.humidity}%</span>{" "}
          </p>
          <p>
            <span className="italic">Wind Speed</span> :{" "}
            <span className="font-bold">{wind.speed} m/s</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
