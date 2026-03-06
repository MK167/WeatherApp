import { useEffect, useState } from "react";
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

  const handleRemoveCity = (id: number) => {
    setCities((prevCities) => prevCities.filter((city) => city.id !== id));
  };

  const touchCities = () => {
    let citiesCopy = [...cities];
    citiesCopy = citiesCopy.map((city) => ({ ...city, updatedAt: new Date() }));
    setCities(citiesCopy);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      touchCities();
    }, 15 * 1000); // 15 seconds

    return () => clearInterval(interval);
  }, [cities]); 

  return (
    <>
      <Header />
      <div className="flex flex-col px-8 py-8 gap-4">
        <Search onCitiesChange={handleAddCity} />

        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <WeatherCard
              handleRemoveCity={handleRemoveCity}
              key={city.id}
              city={city}
            />
          ))}
        </div>
      
      </div>
    </>
  );
}

export default App;
