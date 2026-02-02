import { useState } from "react";
import { environment } from "../environment/environment";
import type { City, CityData } from "../types/City";
import axios from "axios";
import type { SearchProps } from "../types/SearchProps";

function Search({ onCitiesChange }: SearchProps) {
  /** Hooks for managing component state */
  // State to hold the search query input by the user
  const [query, setQuery] = useState("");
  // State to hold the list of cities returned from the search API call
  const [cities, setCities] = useState<CityData[]>([]);

  // Function to handle changes in the input field
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Trigger search logic here, e.g., API call to fetch city data based on the query
    // Define the search URL using the base URL from environment configuration
    const geocodingApiBaseUrl = environment.geocodingApiBaseUrl;
    const searchUrl = `${geocodingApiBaseUrl}${newQuery}`;

    // fetch call to get city data based on the search query when user types in the input field min 3 characters
    /*
    const fetchCities = async () => {
      try {
        const response = await fetch(searchUrl);
        const data: City = await response.json();
        setCities(data?.results || []);
        console.log("Fetched cities with fetch:", data.results);
      } catch (error) {
        console.error("Error fetching city data with fetch:", error);
      }
    };
    */

    // using the same fetch function as above but using axios (to show both methods)
    // advantages of using axios over fetch:
    // 1. Automatic JSON data transformation
    // 2. Better error handling
    // 3. Request and response interceptors
    // 4. Support for older browsers
    // 5. Easier to set up default configurations
    // 6. Built-in XSRF protection
    // 7. Simpler syntax for making requests
    // 8. Supports request cancellation
    // 9. Handles timeouts more gracefully
    // 10. More features for handling HTTP requests and responses
    // 11. Wide community support and plugins
    // 12. Consistent API across different environments (Node.js and browsers)
    // 13. Better support for file uploads and downloads
    // 14. More intuitive handling of query parameters
    // 15. Easier to work with large data sets and streams
    // Overall, axios provides a more robust and user-friendly experience for making HTTP requests compared to the native fetch API.

    const fetchCitiesWithAxios = async () => {
      try {
        const response = await axios.get(searchUrl);
        const data: City = response.data;
        setCities(data?.results || []);
        console.log("Fetched cities with axios:", data.results);
      } catch (error) {
        console.error("Error fetching city data with axios:", error);
      }
    };

    // Call the fetch function if the query length is at least 3 characters
    if (newQuery.length >= 3) fetchCitiesWithAxios();
  };

  // Handle click on a city from the list to select it and notify parent component 
  const handleCityClick = (city: CityData) => {
    onCitiesChange([city]);
    setCities([]);
    setQuery("");
  };

  // Render the search input field
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search for city..."
        className="
                  w-full 
                  p-2
                  border
                border-gray-300 
                  rounded-md 
                  focus:outline-none 
                  focus:ring-2 
                focus:ring-gray-200"
        value={query}
        onChange={handleSearch}
      />
      {/* Render list of cities */}
      {cities.length > 0 && (
        <div className="mt-2 flex flex-col border border-gray-300 rounded-md max-h-60 overflow-y-auto">
          {cities.map((city) => (
            <div
              onClick={() => handleCityClick(city)}
              key={city.id}
              className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            >
              {city.name}, {city.country} ({city.latitude}, {city.longitude})
            </div>
          ))}
        </div>
      )}
      {/* Render message when no cities are found */}
      {cities.length === 0 && query.length >= 3 && (
        <div className="mt-2 p-2 text-gray-500">
          No cities found please try another search term.
        </div>
      )}
    </div>
  );
}
export default Search;
