import { ADD_CITY_WEATHER, DELETE_CITY_WEATHER, UPDATE_SEARCH_WEATHER } from "./constants"
import { IStore, IAction, IWeatherData, ICitiesWeatherData } from "./types"

export default function (state: IStore, action: IAction) : IStore {
    switch (action.type) {
        case ADD_CITY_WEATHER:
            {
                const newWeatherData = action.payload as IWeatherData
                return {
                    ...state,
                    citiesWeatherData: {
                        ...state.citiesWeatherData,
                        [newWeatherData.id]: newWeatherData
                    }
                }
            }
        case DELETE_CITY_WEATHER:
            {
                const cityToDelete = action.payload as string
                return {
                    ...state,
                    citiesWeatherData: Object.keys(state.citiesWeatherData).filter(key => key !== cityToDelete).reduce((obj: ICitiesWeatherData , key: string) => {
                        obj[key] = state.citiesWeatherData[key] 
                      return obj  
                    }, {})
                }
            }
        case UPDATE_SEARCH_WEATHER:
            {
                const newWeatherData = action.payload as IWeatherData
                return {
                    ...state,
                    searchWeatherData : newWeatherData
                }
            }
    }
    return state
}