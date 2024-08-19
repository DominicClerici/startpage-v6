import { useContext } from "react"
import { WeatherEnabledContext, WeatherIsCelsiusContext } from "../../../../context/weather/WeatherProvider"
import Toggle from "../../controls/Toggle"
import WeatherLocation from "./WeatherLocation"
import WeatherLocationList from "./WeatherLocationList"

export default function WeatherSettings() {
  const { weatherEnabled } = useContext(WeatherEnabledContext)
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="showWeather" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show weather</h2>
        </span>
        <Toggle htmlFor="showWeather" ctx={WeatherEnabledContext} />
      </label>
      <div className={`flex flex-col gap-4 transition-opacity ${!weatherEnabled && "pointer-events-none opacity-30"}`}>
        <label htmlFor="useCelsius" className="flex items-center justify-between">
          <span>
            <h2 className="text-lg">Use celsius</h2>
          </span>
          <Toggle htmlFor="useCelsius" ctx={WeatherIsCelsiusContext} />
        </label>
        <WeatherLocation gray={!weatherEnabled} />
        <WeatherLocationList gray={!weatherEnabled} />
      </div>
    </div>
  )
}
