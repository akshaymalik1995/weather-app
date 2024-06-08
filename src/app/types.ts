export interface IWeatherData {
    location: string,
    temperature: number,
    time: string,
    country: string,
    weather: string,
    id: string
}

export interface ICitiesWeatherData {
    [location: string]: IWeatherData
}

export interface IStore {
    citiesWeatherData: ICitiesWeatherData,
    darkModeOn: Boolean,
    searchWeatherData : null | IWeatherData
}

export interface IAction {
    type: string,
    payload : any
}