function WeatherCard({ city, temperature, description }: { city: string; temperature: number; description: string }) {
    return (
        <div className="weather-card p-4 border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">{city}</h2>
            <p className="text-3xl">{temperature}°C</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default WeatherCard;