export interface IWeatherData {
    location: string,
    temperature: number,
    time: string,
    country: string,
    weather: string,
    id: string,
    createdAt? : number
}

export interface ICitiesWeatherData {
    [location: string]: IWeatherData
}

export interface IStore {
    citiesWeatherData: ICitiesWeatherData,
    darkModeOn: Boolean,
    userWeatherData : null | IWeatherData
}

export interface IAction {
    type: string,
    payload : any
}