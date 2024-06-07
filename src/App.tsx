import './App.css'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import {useReducer } from 'react'
import StoreContext from './app/store'
import initialState from './app/initialState'
import reducer from './app/reducer'
function App() {
  
  const [globalState, dispatch]  = useReducer(reducer, initialState)

  
  return (
    <StoreContext.Provider value={[globalState, dispatch]}>
      <div className="mx-auto p-4 max-w-4xl">
        <div className="my-16">
          <h1 className="text-4xl text-gray-700  font-semibold text-center">
            Weather App
          </h1>
        </div>
        <SearchForm />
        <div>
          {globalState.searchWeatherData && (
            <WeatherCard
              weatherData={globalState.searchWeatherData}
            />
          )}
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App
