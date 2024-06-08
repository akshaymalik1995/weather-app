import { IStore, IWeatherData } from "../app/types";
import { FiDelete } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";
import { useContext } from "react";
import StoreContext from "../app/store";
import getWeather from "../lib/getWeather";
import { updateCityWeather } from "../app/actions";


export default function WeatherCard(props: { weatherData: IWeatherData }) {
  const weatherData = props.weatherData
  const [globalState , dispatch] = useContext(StoreContext) 
  
  // When the user clicks on the refresh button, get the weatherData from the global state
  // Get the lat, long and send request to the API
  // Change the global state
  async function refreshWeather(id: string) {
    console.log(id)
    const oldWeatherData = globalState.citiesWeatherData[id]
    const newWeatherData = await getWeather(oldWeatherData.location, oldWeatherData.country)
    console.log(updateCityWeather({ ...newWeatherData }));
    dispatch(updateCityWeather({...newWeatherData}))
  }

  return (
    <div className=" bg-blue-200 bg-opacity-60   dark:bg-gray-800 shadow-lg  rounded-lg w-60">
      <h2 className="text-xl text-center my-4">
        {weatherData.location}, {weatherData.country}
      </h2>
      <div className="flex justify-center items-center mb-4">
        <span className="text-4xl relative font-bold">
          {weatherData.temperature.toFixed()}°
          <span className="absolute -right-4 -top-2 font-normal text-[2rem] ">
            c
          </span>{" "}
        </span>
      </div>
      <div className="mb-4 flex gap-2 justify-center items-center ">
        <div>{weatherData.weather}</div>
      </div>
      <div className="flex justify-center text-sm  items-center">
        {weatherData.time}
      </div>
      <div className="grid rounded mt-4 grid-cols-2 ">
        <div title="Refresh" onClick={e => refreshWeather(weatherData.id)}  className="flex justify-center items-center cursor-pointer px-2 py-1  bg-blue-300 "><BiRefresh /></div>
        <div title="Delete" className="flex justify-center items-center cursor-pointer px-2 py-1 bg-red-200 "><FiDelete /></div>
      </div>
    </div>
  );
}


