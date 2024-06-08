import { ADD_CITY_WEATHER, DELETE_CITY_WEATHER, UPDATE_CITY_WEATHER, UPDATE_USER_WEATHER } from "./constants"
import { IWeatherData } from "./types"

export function addCityWeather(weatherData : IWeatherData) {
    return {
        type: ADD_CITY_WEATHER,
        payload : weatherData
    }
}  

export function updateCityWeather(weatherData : IWeatherData) {
    return {
        type: UPDATE_CITY_WEATHER,
        payload : weatherData
    }
}

export function deleteCityWeather(city : string) {
    return {
        type: DELETE_CITY_WEATHER,
        payload : city
    }
}

export function updateUserWeather(weatherData: IWeatherData | null) {
    return {
        type: UPDATE_USER_WEATHER,
        payload : weatherData
    }
}