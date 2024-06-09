import { ADD_CITY_WEATHER, DELETE_CITY_WEATHER, UPDATE_USER_WEATHER , UPDATE_CITY_WEATHER, TOGGLE_DARK_MODE} from "./constants"
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
        case UPDATE_CITY_WEATHER:
            {
                const newWeatherData = action.payload as IWeatherData
                if (newWeatherData.id in state.citiesWeatherData) {
                    return {
                        ...state,
                        citiesWeatherData: {
                            ...state.citiesWeatherData,
                            [newWeatherData.id]: newWeatherData
                        }
                    }
                } 
                return state
                
            }
        case DELETE_CITY_WEATHER:
            {
                const cityToDelete = action.payload as string
               
                return {
                    ...state,
                    citiesWeatherData: Object.keys(state.citiesWeatherData).filter(key => key !== cityToDelete.toString()).reduce((obj: ICitiesWeatherData , key: string) => {
                        obj[key] = state.citiesWeatherData[key] 
                      return obj  
                    }, {})
                }
                
            }
        case UPDATE_USER_WEATHER:
            {
                const newWeatherData = action.payload as IWeatherData
                return {
                    ...state,
                    userWeatherData : newWeatherData
                }
            }
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkModeOn : action.payload || !state.darkModeOn
            }
    }
    return state
}