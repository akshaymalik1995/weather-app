import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { useContext } from "react";
import StoreContext from "../app/store";
import { addCityWeather } from "../app/actions";
import getWeather from "../lib/getWeather";
import { IWeatherData } from "../app/types";
import { loadEnvFile } from "process";

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
    console.log(data)
    return data.cities
  } catch (error) {
    console.error(error);
    return [];
  }
}


export default function SearchForm() {
  const [globalState, dispatch] = useContext(StoreContext);
  const [locationInput, setLocationInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<Object[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeSuggestions);

    return () => {
      document.removeEventListener("click", closeSuggestions)
    }
  }, [])

  async function onSuggestionSelection(city : string, countryCode : string) {
    
    const weatherData = await getWeather(city, countryCode);
    dispatch(addCityWeather({ ...weatherData }));
    setLocationInput("");
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSuggestionSelection(locationInput)
  }


  function closeSuggestions() {
    setSuggestionsOpen(false);
  }

  function openSuggestions() {
    setSuggestionsOpen(true);
  }

  async function handleInputChange(value: string) {
    setLocationInput(value);
    if (!value) {
      closeSuggestions();
      setCitySuggestions([]);
      return;
    }
    openSuggestions();
    const cities : Object[] = await getCitiesSuggestion(value);
    if (cities) {
      setCitySuggestions([...cities]);
    }
    
  }
  return (
    <div className="w-full my-16">
      {/* A Form to take user input - Location */}
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex w-full gap-4 "
        action=""
      >
        {/* A Text Input */}
        <div className="grow relative">
          <input
            
            value={locationInput}
            onChange={(e) => handleInputChange(e.target.value)}
            autoFocus={true}
            placeholder="Search City.."
            className="px-2 rounded w-full py-2 shadow focus:outline-none "
            type="search"
          />
          <SuggestionsList
            isOpen={suggestionsOpen}
            onSuggestionSelection={onSuggestionSelection}
            suggestions={[...citySuggestions]}
          />
        </div>
        <button className="px-2 py-2 bg-blue-200 rounded"  type="submit">Search</button>
      </form>
    </div>
  );
}
