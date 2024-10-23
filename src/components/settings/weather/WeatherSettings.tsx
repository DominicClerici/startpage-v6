import {
  WeatherEnabledContext,
  WeatherIsCelsiusContext,
  WeatherLocationContext,
  WeatherLocationOptions,
} from "@/context/weather/WeatherProvider"
import Toggle from "../controls/Toggle"
import { useContext, useState } from "react"
import { TriangleAlert } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import ManualLocation from "./ManualLocation"

export default function WeatherSettings() {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <label htmlFor="showWeather" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show weather</h2>
        </span>
        <Toggle htmlFor="showWeather" ctx={WeatherEnabledContext} />
      </label>
      <label htmlFor="useCelsius" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Use celsius</h2>
        </span>
        <Toggle htmlFor="useCelsius" ctx={WeatherIsCelsiusContext} />
      </label>
      <WeatherLocation />
      <ManualLocation />
    </div>
  )
}

const WeatherLocation = () => {
  const [error, setError] = useState<null | string>(null)
  const { weatherLocationOptions } = useContext(WeatherLocationOptions)
  const { weatherLocation, setWeatherLocation } = useContext(WeatherLocationContext)

  const handleCheckLocation = (e: boolean) => {
    if (e) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setError(null)
            setWeatherLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              name: "auto",
              id: "auto",
            })
          },
          (error) => {
            if (error.code === 1) {
              setError("Location permission denied. Please check browser settings.")
            } else {
              setError("Location unavailable. Please check browser settings.")
            }
          },
        )
      } else {
        setError("Browser doesn't support geolocation.")
      }
    } else {
      setError(null)
      if (weatherLocationOptions.length > 0) {
        setWeatherLocation(weatherLocationOptions[0])
      } else {
        setWeatherLocation({
          lat: 0,
          lon: 0,
          name: "none",
        })
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center justify-between" htmlFor="autoWeather">
        <span>
          <h2 className="text-lg">Use GPS location</h2>
        </span>
        <Switch id="autoWeather" checked={weatherLocation.id === "auto"} onCheckedChange={handleCheckLocation} />
      </label>
      {error && (
        <span className="-mt-2 flex animate-[fadeScaleIn_.2s_ease-out] items-center gap-2 text-destructive">
          <TriangleAlert className="h-5 w-5" /> {error}
        </span>
      )}
    </div>
  )
}
