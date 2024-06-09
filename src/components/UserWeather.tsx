import  { ReactElement, useEffect } from "react";
import getWeather from "../lib/getWeather";
import { useContext } from "react";
import StoreContext from "../app/store";
import { updateUserWeather } from "../app/actions";
import { LuSun } from "react-icons/lu";
import { IoCloudSharp } from "react-icons/io5";
import { IoRainy } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
import { BsCloudDrizzleFill } from "react-icons/bs";

// Define a mapping between weather conditions and corresponding icons
interface IWeatherIconMapping {
  [weather: string]: ReactElement;
}

// Main functional component for displaying user-specific weather data
export default function UserWeather() {
  // Use the StoreContext to access and manipulate the global state
  const [globalState, dispatch] = useContext(StoreContext);

  // Mapping of weather conditions to their corresponding icons
  const weatherIconMapping: IWeatherIconMapping = {
    Clear: <LuSun />,
    Clouds: <IoCloudSharp />,
    Rain: <IoRainy />,
    Thunderstorm: <IoIosThunderstorm />,
    Drizzle: <BsCloudDrizzleFill />,
  };

  // Effect hook to fetch and update weather data when the component mounts
  useEffect(() => {
    // Check if geolocation is supported and request permission to access location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Construct a query string with latitude and longitude
          const query = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
          // Fetch weather data using the constructed query
          const weather = await getWeather(query);
          // Update the global state with the fetched weather data
          if (!dispatch) return;
          dispatch(updateUserWeather({ ...weather }));
        },
        () => {
          // Handle errors in fetching geolocation or weather data
          if (!dispatch) return;
          dispatch(updateUserWeather(null));
        }
      );
    }
  }, []);

  // Render the component, conditionally displaying weather data if available
  return (
    <>
      {globalState?.userWeatherData && (
        <div className="p-6 max-w-md mx-auto bg-blue-200 my-8 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl dark:text-white font-semibold text-center mb-4">
            Weather in {globalState.userWeatherData.location}
          </h2>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between gap-4 items-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                {globalState.userWeatherData.temperature.toFixed()}°
              </div>
              <div className="dark:text-white flex items-center gap-2 bg-blue-300/70 dark:bg-gray-700  px-2 rounded p-2 ">
                {globalState.userWeatherData.weather in weatherIconMapping ? (
                  <div className="text-xl">
                    {weatherIconMapping[globalState.userWeatherData.weather]}
                  </div>
                ) : (
                  ""
                )}

                {globalState.userWeatherData.weather}
              </div>
            </div>

            <div className="mt-4 dark:text-gray-200 text-sm text-gray-800">
              {globalState.userWeatherData.time}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
