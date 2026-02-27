import React, { useEffect } from "react";
import type { CityData } from "../types/City";
import type { Weather } from "../types/Weather";
import { getWeatherCodes, getWeatherIcon } from "../utils/utils";

type WeatherCardProps = {
  city: CityData;
  handleRemoveCity: (id: number) => void;
};
function WeatherCard({ city, handleRemoveCity }: WeatherCardProps) {
  const [weatherData, setWeatherData] = React.useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,weather_code&current_weather=true`,
        );
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather data:", data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [city.updatedAt]);

  console.log("Current weather data:", weatherData);
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">
          {city.name}, {city.country}
        </h2>
        <div onClick={() => handleRemoveCity(city.id)} className="cursor-pointer text-amber-800 text-2xl">X</div>
      </div>

      <p className="text-4xl font-bold">
        {weatherData
          ? Math.round(weatherData?.current_weather.temperature)
          : "Loading..."}{" "}
        {weatherData ? weatherData?.current_weather_units.temperature : ""}
      </p>
      <p className="text-sm text-gray-600">
        {weatherData
          ? `${getWeatherCodes(weatherData?.current_weather.weathercode)} ${getWeatherIcon(weatherData?.current_weather.weathercode)}`
          : ""}
      </p>
      <p className="text-sm text-gray-600 border-t border-gray-300 pt-2">
        Wind:{" "}
        {weatherData
          ? `${weatherData?.current_weather.windspeed} ${weatherData?.current_weather_units.windspeed}`
          : "Loading..."}
      </p>
      <p className="text-sm text-gray-600">
        Wind Direction:{" "}
        {weatherData
          ? `${weatherData?.current_weather.winddirection} ${weatherData?.current_weather_units.winddirection}`
          : "Loading..."}
      </p>
      <p className="text-sm text-gray-600">
        Last Updated:{" "}
        {weatherData ? city.updatedAt.toLocaleString() : "Loading..."}
      </p>
    </div>
  );
}

export default WeatherCard;
