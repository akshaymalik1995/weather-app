import { IWeatherData } from "../app/types";
import { FiDelete } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";
import { ReactElement, useContext } from "react";
import StoreContext from "../app/store";
import getWeather from "../lib/getWeather";
import { deleteCityWeather, updateCityWeather } from "../app/actions";
import { LuSun } from "react-icons/lu";
import { IoCloudSharp } from "react-icons/io5";
import { IoRainy } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
import { BsCloudDrizzleFill } from "react-icons/bs";

interface IWeatherIconMapping {
  [weather: string]: ReactElement;
}
  


export default function WeatherCard(props: { weatherData: IWeatherData }) {
  const weatherData = props.weatherData
  const [globalState, dispatch] = useContext(StoreContext)

  
  const weatherIconMapping : IWeatherIconMapping = {
    "Clear": <LuSun />,
    "Clouds": <IoCloudSharp />,
    "Rain": <IoRainy />,
    "Thunderstorm": <IoIosThunderstorm />,
    "Drizzle" : <BsCloudDrizzleFill />
}
  
  // When the user clicks on the refresh button, get the weatherData from the global state
  // Get the lat, long and send request to the API
  // Change the global state
  async function refreshWeather(id: string) {
    console.log(id)
    if (!globalState || !dispatch) return
    const oldWeatherData = globalState.citiesWeatherData[id]
    const query = `q=${oldWeatherData.location},${oldWeatherData.country}`;
    const newWeatherData = await getWeather(query)
    dispatch(updateCityWeather({...newWeatherData, createdAt : oldWeatherData.createdAt }))
  }


  function deleteWeather(id: string) {
    if (!dispatch) return
    dispatch(deleteCityWeather(id))
  }

  return (
    <div className=" bg-blue-200 bg-opacity-60    dark:bg-gray-800 shadow-lg  rounded-lg w-60 dark:text-gray-100">
      <h2 className="text-xl text-center my-4 dark:text-white">
        {weatherData.location}, {weatherData.country}
      </h2>

      <div className="flex justify-center items-center mb-4">
        <span className="text-4xl relative font-bold dark:text-white">
          {weatherData.temperature.toFixed()}°
          <span className="absolute -right-4 -top-2 font-normal text-[2rem] dark:text-white">
            c
          </span>{" "}
        </span>
      </div>
      <div className="mb-4 flex gap-2 justify-center items-center ">
        <div className="dark:text-white flex items-center gap-2 bg-blue-300/30 px-2 rounded p-1 ">
          
            {weatherData.weather in weatherIconMapping
              ? <div className="text-xl">{weatherIconMapping[weatherData.weather]}</div>
              : ""}
          {weatherData.weather}
        </div>
      </div>
      <div className="flex justify-center text-sm items-center dark:text-gray-300">
        {weatherData.time}
      </div>
      <div className="grid  rounded mt-4 grid-cols-2">
        <div
          title="Refresh"
          onClick={() => refreshWeather(weatherData.id)}
          className="flex rounded-bl text-xl justify-center items-center cursor-pointer p-2 bg-blue-300 dark:bg-gray-700"
        >
          <BiRefresh />
        </div>
        <div
          onClick={() => deleteWeather(weatherData.id)}
          title="Delete"
          className="flex rounded-br justify-center items-center cursor-pointer p-2 bg-red-200 dark:bg-red-500"
        >
          <FiDelete />
        </div>
      </div>
    </div>
  );
}


