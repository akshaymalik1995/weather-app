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

interface IWeatherIconMapping {
  [weather: string]: ReactElement;
}

export default function UserWeather() {
  const [globalState, dispatch] = useContext(StoreContext);
  const weatherIconMapping: IWeatherIconMapping = {
    Clear: <LuSun />,
    Clouds: <IoCloudSharp />,
    Rain: <IoRainy />,
    Thunderstorm: <IoIosThunderstorm />,
    Drizzle: <BsCloudDrizzleFill />,
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const query = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
          const weather = await getWeather(query);
          if (!dispatch) return;
          dispatch(updateUserWeather({ ...weather }));
        },
        () => {
          if (!dispatch) return;
          dispatch(updateUserWeather(null));
        }
      );
    }
  }, []);
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
