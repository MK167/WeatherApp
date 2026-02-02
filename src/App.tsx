import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import type { CityData } from "./types/City";
function App() {
  const [cities, setCities] = useState<CityData[]>([]);
  const handleAddCity = (newCityOrCities: CityData | CityData[]) => {
    setCities((prevCities) => [
      ...prevCities,
      ...(Array.isArray(newCityOrCities) ? newCityOrCities : [newCityOrCities]),
    ]);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col px-8 py-8 gap-4">
        <Search onCitiesChange={handleAddCity} />

        {cities.map((city) => (
          <WeatherCard
            key={city.id}
            city={city.name}
            temperature={city.population / 1000}
            description="Sunny"
          />
        ))}
      </div>
    </>
  );
}

export default App;
