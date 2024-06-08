import { IStore } from "./types" 

let initialState : IStore = {
    citiesWeatherData: {},
    darkModeOn: false,
    searchWeatherData : null
}

try {
    if (localStorage.getItem("globalState")) {
        initialState = JSON.parse(localStorage.getItem("globalState") || "")
    }
} catch (error) {
    console.error("Failed to get globalState from localStorage")
}



export default initialState