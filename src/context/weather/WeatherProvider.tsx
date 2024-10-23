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

export type WeatherLocationType = {
  lat: number
  lon: number
  name: string
  id: number | "auto" | "none"
}

interface WeatherLocationContextType {
  weatherLocation: WeatherLocationType
  setWeatherLocation: (location: WeatherLocationType) => void
}

export const WeatherLocationContext = createContext<WeatherLocationContextType | null>(null)
export const weatherLocationDefault = { lat: 39.1653, lon: -86.5264, name: "San Francisco, CA", id: 0 }
const WeatherLocationProvider = ({ children }) => {
  const [weatherLocation, setWeatherLocation] = useChromeStorage<WeatherLocationType>(
    "weatherLocation",
    weatherLocationDefault,
  )
  return (
    <WeatherLocationContext.Provider value={{ weatherLocation, setWeatherLocation }}>
      {children}
    </WeatherLocationContext.Provider>
  )
}

export const WeatherLocationOptions = createContext(null)
export const weatherLocationOptionsDefault = [
  { lat: 37.7749, lon: -122.4194, name: "San Francisco, CA", id: 0 },
  { lat: 37.7749, lon: -122.4194, name: "Los Angeles, CA", id: 1 },
  { lat: 37.7749, lon: -122.4194, name: "Fresno, CA", id: 2 },
  { lat: 37.7749, lon: -122.4194, name: "Orinda, CA", id: 3 },
]
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
          <WeatherLocationOptionsProvider>{children}</WeatherLocationOptionsProvider>
        </WeatherLocationProvider>
      </WeatherIsCelsiusProvider>
    </WeatherEnabledProvider>
  )
}
