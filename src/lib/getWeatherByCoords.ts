import { IWeatherData } from "../app/types";
import getCityTime from "./getCityTime";

export default async function getWeatherByCoords(lat: number, lon: number) {
    try {
        const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to get weather." + response.statusText);
        }
        const data = await response.json();

        const weatherData: IWeatherData = {
            id: data.id,
            location: data.name,
            time: getCityTime(data.timezone),
            country: data.sys.country,
            temperature: data.main.temp,
            weather: data.weather[0].main,
        };
        console.log(weatherData)
        return weatherData;
    } catch (error) {
        console.error(error)
        throw Error(error instanceof Error ? error.message : "Weather API Failed. Please try again.")
    }
}
