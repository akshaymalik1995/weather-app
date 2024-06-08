import React, { useEffect, useState } from "react";
import getWeatherByCoords from "../lib/getWeatherByCoords";
import { useContext } from "react";
import StoreContext from "../app/store";
import { updateUserWeather } from "../app/actions";


export default function UserWeather() {
  const [globalState, dispatch] = useContext(StoreContext);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const weather = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          dispatch(updateUserWeather({ ...weather }));
        },
          () => {
            dispatch(updateUserWeather(null))
        }
      );
    }
  }, []);
  return (
      <>
          {
          globalState.userWeatherData && 
              <div className="p-6 max-w-md mx-auto bg-blue-300 bg-opacity-50 backdrop-blur-lg my-8 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <h2 className="text-2xl font-semibold text-center mb-4">
                      Weather in {globalState.userWeatherData.location}
                  </h2>
                  <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {globalState.userWeatherData.temperature.toFixed()}°
                      </span>
                      <div className="mt-4 text-sm text-gray-500">
                          {globalState.userWeatherData.time}
                      </div>
                  </div>
              </div>
          
      }
      </>
      
    
  );
}
