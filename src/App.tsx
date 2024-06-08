import './App.css'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import {useEffect, useReducer } from 'react'
import StoreContext from './app/store'
import initialState from './app/initialState'
import reducer from './app/reducer'
import UserWeather from './components/UserWeather'
function App() {
  
  const [globalState, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    try {
      localStorage.setItem("globalState", JSON.stringify(globalState))
    } catch (error) {
      console.error("Failed to add globalState to localStorage")
    }
  }, [globalState])

  
  return (
    <StoreContext.Provider value={[globalState, dispatch]}>
      <div className="bg-blue-100 min-h-screen ">
        <div className="mx-auto   p-4 max-w-4xl">
          <div className="my-16">
            <h1 className="text-4xl text-gray-700  font-semibold text-center">
              Weather App
            </h1>
          </div>
          <SearchForm />
          <UserWeather />
          <div className='flex my-10 justify-start gap-8 flex-wrap' >
            {Object.keys(globalState.citiesWeatherData).length > 0 &&
              Object.keys(globalState.citiesWeatherData).map((id) => (
                <WeatherCard key={id} weatherData={globalState.citiesWeatherData[id]} />
              ))}
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App
