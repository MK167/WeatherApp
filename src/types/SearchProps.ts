import type { CityData } from "./City";

export type SearchProps = {
  onCitiesChange: (cities: CityData | CityData[]) => void;
};