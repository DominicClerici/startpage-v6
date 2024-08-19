import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const WeatherEnabledContext = createContext(null)
export const weatherEnabledDefault = true
const WeatherEnabledProvider = ({ children }) => {
  const [weatherEnabled, setWeatherEnabled] = useChromeStorage("weatherEnabled", weatherEnabledDefault)
  return (
    <WeatherEnabledContext.Provider value={{ weatherEnabled, setWeatherEnabled }}>
      {children}
    </WeatherEnabledContext.Provider>
  )
}

export const WeatherIsCelsiusContext = createContext(null)
export const weatherIsCelsiusDefault = false
const WeatherIsCelsiusProvider = ({ children }) => {
  const [weatherIsCelsius, setWeatherIsCelsius] = useChromeStorage("weatherIsCelsius", weatherIsCelsiusDefault)
  return (
    <WeatherIsCelsiusContext.Provider value={{ weatherIsCelsius, setWeatherIsCelsius }}>
      {children}
    </WeatherIsCelsiusContext.Provider>
  )
}

export const UseAutomaticLocationContext = createContext(null)
export const useAutomaticLocationDefault = false
const UseAutomaticLocationProvider = ({ children }) => {
  const [useAutomaticLocation, setUseAutomaticLocation] = useChromeStorage(
    "useAutomaticLocation",
    useAutomaticLocationDefault,
  )

  return (
    <UseAutomaticLocationContext.Provider value={{ useAutomaticLocation, setUseAutomaticLocation }}>
      {children}
    </UseAutomaticLocationContext.Provider>
  )
}

export const WeatherLocationContext = createContext(null)
export const weatherLocationDefault = { lat: 0, lon: 0, name: "none" }
const WeatherLocationProvider = ({ children }) => {
  const [weatherLocation, setWeatherLocation] = useChromeStorage("weatherLocation", weatherLocationDefault)
  return (
    <WeatherLocationContext.Provider value={{ weatherLocation, setWeatherLocation }}>
      {children}
    </WeatherLocationContext.Provider>
  )
}

export const WeatherLocationOptions = createContext(null)
export const weatherLocationOptionsDefault = [{ lat: 37.7749, lon: -122.4194, name: "San Francisco" }]
const WeatherLocationOptionsProvider = ({ children }) => {
  const [weatherLocationOptions, setWeatherLocationOptions] = useChromeStorage(
    "weatherLocationOptions",
    weatherLocationOptionsDefault,
  )
  return (
    <WeatherLocationOptions.Provider value={{ weatherLocationOptions, setWeatherLocationOptions }}>
      {children}
    </WeatherLocationOptions.Provider>
  )
}

export const WeatherProvider = ({ children }) => {
  return (
    <WeatherEnabledProvider>
      <WeatherIsCelsiusProvider>
        <WeatherLocationProvider>
          <WeatherLocationOptionsProvider>
            <UseAutomaticLocationProvider>{children}</UseAutomaticLocationProvider>
          </WeatherLocationOptionsProvider>
        </WeatherLocationProvider>
      </WeatherIsCelsiusProvider>
    </WeatherEnabledProvider>
  )
}
