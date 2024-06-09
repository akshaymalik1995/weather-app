import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { useContext } from "react";
import StoreContext from "../app/store";
import { addCityWeather } from "../app/actions";
import getWeather from "../lib/getWeather";
import { MdCancel } from "react-icons/md";
import Spinner from "./Spinner";
import { BiSearch } from "react-icons/bi";

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
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false) // State to manage loading status

  useEffect(() => {
    document.addEventListener("click", closeSuggestions);

    return () => {
      document.removeEventListener("click", closeSuggestions)
    }
  }, [])

  async function onSuggestionSelection(city: string, countryCode: string) {
    setLoading(true)
    try {
      const query = `q=${city},${countryCode}`
      const weatherData = await getWeather(query);
      if (!dispatch) return
          dispatch(addCityWeather({ ...weatherData }));
    } catch (error : any) {
        setError(error.message)
    }
    
    setLocationInput("");
    setLoading(false)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!locationInput) return
    onSuggestionSelection(locationInput, "")
  }


  function closeSuggestions() {
    setSuggestionsOpen(false);
  }

  function openSuggestions() {
    setSuggestionsOpen(true);
  }

  async function handleInputChange(value: string) {
    setError("")
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
            className="px-2 dark:bg-gray-800 dark:text-white rounded w-full py-2 shadow focus:outline-none "
            type="search"
          />
          <SuggestionsList
            isOpen={suggestionsOpen}
            onSuggestionSelection={onSuggestionSelection}
            suggestions={[...citySuggestions]}
          />
        </div>
        <button
          className="px-2 py-2 bg-white dark:bg-gray-700 dark:text-white text-blue-500 rounded"
          type="submit"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="w-6 h-6 flex justify-center items-center " >
              <BiSearch />
            </div>
          )}
        </button>
      </form>
      {error && (
        <div className="p-2 items-center my-4 bg-red-200 flex justify-between rounded">
          {error.toUpperCase()}
          <span
            className="text-2xl text-red-900 cursor-pointer"
            onClick={() => setError("")}
          >
            <MdCancel />
          </span>
        </div>
      )}
    </div>
  );
}
