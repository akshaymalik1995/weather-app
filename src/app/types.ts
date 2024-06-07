export interface IWeatherData {
    location: string,
    temperature: number,
    minTemp: number,
    maxTemp: number,
    weather : string
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