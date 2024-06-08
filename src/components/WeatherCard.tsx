import { IWeatherData } from "../app/types";


/**
 * Calculates and returns the current time in a specified city based on its timezone offset.
 *
 * @param tzOffsetInSec The timezone offset in seconds for the city whose time we want to calculate.
 * @returns A string representation of the current time in the specified city.
 */
function getCityTime(tzOffsetInSec: number): string {
  // Get the current date and time
  const date = new Date();
  // Convert the current time to milliseconds since the Unix Epoch
  const timeInMs = date.getTime();
  // Convert the provided timezone offset from seconds to milliseconds
  const tzOffsetInMs = tzOffsetInSec * 1000;
  // Calculate the timezone offset in milliseconds for the local system
  const localTzOffsetInMs = date.getTimezoneOffset() * 60000;
  // Add the calculated offsets to the current time to get the time in the target city
  const cityDate = new Date(timeInMs + tzOffsetInMs + localTzOffsetInMs);
  // Format and return the time as a localized string
  return cityDate.toLocaleString();
}

export default function WeatherCard(props: { weatherData: IWeatherData }) {
    const weatherData = props.weatherData
  return (
    <div className=" bg-blue-200 bg-opacity-60   dark:bg-gray-800 shadow-lg  rounded-lg p-2 w-60 mx-auto py-10  my-10">
      <h2 className="text-xl text-center mb-4">{weatherData.location}, { weatherData.country}</h2>
      <div className="flex justify-center items-center mb-4">
        <span className="text-4xl relative font-bold">
          {weatherData.temperature.toFixed()}°{" "}
          <span className="absolute -right-4 -top-2 font-normal text-[2rem] ">
            c
          </span>{" "}
        </span>
      </div>
      <div className="mb-4 flex gap-2 justify-center items-center ">
        <div>{weatherData.weather}</div>
      </div>
      <div className="flex justify-center text-sm  items-center">
        {getCityTime(weatherData.timezone)}
      </div>
    </div>
  );
}


