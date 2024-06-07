import { useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { useContext } from "react";
import store from "../app/store";
import StoreContext from "../app/store";
import { updateSearchWeather } from "../app/actions";
import { IWeatherData } from "../app/types";

async function getCitiesSuggestion(value: string) {
  try {
    const url = `https://api.thecompaniesapi.com/v1/locations/cities?search=${encodeURIComponent(
      value
    )}&size=5`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to get cities" + response.statusText);
    }
    const data = await response.json();
    const cities = data.cities.reduce(
      (list: string[], item: { [name: string]: string }) => [
        ...list,
        item.name,
      ],
      []
    );
    return cities;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getWeather(value: string) {
    try {
        const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      value
    )}&appid=${OPEN_WEATHER_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to get weather." + response.statusText);
    }
    const data = await response.json();
    return data
    
  } catch (error) {
    console.error(error);
  }
}

export default function SearchForm() {
  const [globalState, dispatch] = useContext(StoreContext)
  const [locationInput, setLocationInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);

  function onSuggestionSelection(value: string) {
    setLocationInput(value);
    }
    
    async function onFormSubmit(e: React.FormEvent) {
        e.preventDefault()
      const weatherData = await getWeather(locationInput)
      const newWeatherData: IWeatherData = {
        location: weatherData.name,
        minTemp: weatherData.main.temp_min,
        maxTemp: weatherData.main.temp_max,
        temperature: weatherData.main.temp,
        weather : weatherData.weather[0].main
      };
      dispatch(updateSearchWeather(newWeatherData))
    }

  async function handleInputChange(value: string) {
    
    setLocationInput(value);
    if (!value) {
      setCitySuggestions([]);
      return;
    }
    const cities = await getCitiesSuggestion(value);
    setCitySuggestions(cities);
  }
  return (
    <div className="w-full">
      {/* A Form to take user input - Location */}
      <form onSubmit={e => onFormSubmit(e)} className="flex w-full gap-4 " action="">
        {/* A Text Input */}
        <div className="grow relative">
          <input
            value={locationInput}
            onChange={(e) => handleInputChange(e.target.value)}
            autoFocus={true}
            placeholder="Search City.."
            className="px-2 w-full py-2 shadow focus:outline-none "
            type="text"
          />
          <SuggestionsList
            onSuggestionSelection={onSuggestionSelection}
            suggestions={citySuggestions}
          />
        </div>
        {/* Button to submit the form */}
        <button type="submit" className="px-4 py-2 shadow bg-blue-100  rounded">
          Search
        </button>
      </form>
    </div>
  );
}
