import "./App.css";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import { useEffect, useReducer } from "react";
import StoreContext from "./app/store";
import initialState from "./app/initialState";
import reducer from "./app/reducer";
import UserWeather from "./components/UserWeather";
import DarkModeSwitch from "./components/DarkModeSwitch";
function App() {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    try {
      localStorage.setItem("globalState", JSON.stringify(globalState));
    } catch (error) {
      console.error("Failed to add globalState to localStorage");
    }
  }, [globalState]);

  useEffect(() => {
    if (!globalState.darkModeOn) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [globalState.darkModeOn]);

  return (
    <StoreContext.Provider value={[globalState, dispatch]}>
      <div className="bg-blue-100 dark:bg-gray-900  min-h-screen ">
        <div className="mx-auto   p-4 max-w-4xl">
          <div className="flex items-center justify-between  my-8">
            <h1 className="text-4xl dark:text-white text-gray-700  font-semibold text-center">
              OpenWeather
            </h1>
            <DarkModeSwitch />
          </div>
          <UserWeather />
          <SearchForm />

          <div className="flex justify-center gap-8 flex-wrap">
            {globalState.citiesWeatherData &&
              Object.keys(globalState.citiesWeatherData).length > 0 &&
              Object.keys(globalState.citiesWeatherData)
                .sort(
                  (key1, key2) =>
                    (globalState.citiesWeatherData[key2].createdAt || 1) -
                    (globalState.citiesWeatherData[key1].createdAt || 1)
                )
                .map((id) => (
                  <WeatherCard
                    key={id}
                    weatherData={globalState.citiesWeatherData[id]}
                  />
                ))}
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
