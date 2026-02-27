export type City = {
  results: CityData[];
  generationtime_ms: number;
}

export type CityData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2_id?: number;
  admin3_id?: number;
  postcodes?: string[];
  updatedAt: Date;
};