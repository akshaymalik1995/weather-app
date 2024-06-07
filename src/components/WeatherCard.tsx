import { IWeatherData } from "../app/types";

export default function WeatherCard(props: { weatherData: IWeatherData }) {
    const weatherData = props.weatherData
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md mx-auto my-10">
      <h2 className="text-xl font-bold mb-4">{weatherData.location}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">{weatherData.temperature}°</span>
    
      </div>
      <div className="mb-4">
        <span className="text-gray-500 dark:text-gray-400">Min Temp:</span>{" "}
        {weatherData.minTemp}°
      </div>
      <div className="mb-4">
        <span className="text-gray-500 dark:text-gray-400">Max Temp:</span>{" "}
        {weatherData.maxTemp}°
      </div>
    </div>
  );
}


