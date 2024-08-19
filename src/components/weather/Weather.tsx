import { useContext, useEffect, useState } from "react"
import {
  WeatherEnabledContext,
  WeatherIsCelsiusContext,
  WeatherLocationContext,
} from "../../context/weather/WeatherProvider"
import AnimateUnmount from "../lib/AnimateUnmount"
import Content from "./content/Content"
import Loading from "../lib/Loading"
import "./content/weather.css"
import convertWMOCode from "./convertWMOCode"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CloudCogIcon, SunIcon } from "lucide-react"

interface PreviewWeatherData {
  temperature: number
  descriptor: string
  iconCode: string
}

interface FullData {
  temperature: number[]
  apparentTemperature: number[]
  precipitationProbability: number[]
  cloudCover: number[]
  visibility: number[]
  windSpeed: number[]
  uvIndex: number[]
  time: string[]
}

const SunSVG = () => {
  return (
    <svg
      className="transition-colors group-hover:text-white"
      width="30"
      height="30"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default function Weather() {
  const { weatherEnabled } = useContext(WeatherEnabledContext)
  if (!weatherEnabled) return <></>
  const { weatherIsCelsius } = useContext(WeatherIsCelsiusContext)
  const { weatherLocation, setWeatherLocation } = useContext(WeatherLocationContext)
  const [isOpen, setIsOpen] = useState(false)
  const [fullState, setFullState] = useState<"loading" | "inactive" | string | FullData>("inactive")
  const [previewState, setPreviewState] = useState<"loading" | "error" | PreviewWeatherData>("loading")

  useEffect(() => {
    if (!weatherLocation || weatherLocation.name === "none") {
      setPreviewState("error")
      setFullState("You must set your location in settings")
    } else {
      fetchPreviewData().then((data) => {
        if (!data) {
          setPreviewState("error")
          setFullState("Unable to fetch weather data")
        } else {
          setPreviewState(data)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!weatherLocation || weatherLocation.name === "none") {
      setPreviewState("error")
      setFullState("You must set your location in settings")
    } else {
      setFullState("inactive")
      fetchPreviewData().then((data) => {
        if (!data) {
          setPreviewState("error")
          setFullState("Unable to fetch weather data")
        } else {
          setPreviewState(data)
        }
      })
    }
  }, [weatherLocation.lat, weatherLocation.lon, weatherIsCelsius])

  const handleToggle = (e: boolean) => {
    setIsOpen(e)
    if (fullState === "inactive") {
      setFullState("loading")
      fetchFullData().then((data) => {
        if (!data) {
          setPreviewState("error")
          setFullState("Unable to fetch weather data")
        }
        setFullState(data)
      })
    }
  }

  const fetchPreviewData = async () => {
    if (weatherLocation.name === "auto") {
      if ("navigator" in window) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setWeatherLocation({
              name: "auto",
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          },
          () => {
            console.log("Error updating weather location, using saved location")
          },
        )
      }
    }
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocation.lat}&longitude=${weatherLocation.lon}&current=temperature_2m,apparent_temperature,weather_code&temperature_unit=${weatherIsCelsius ? "celsius" : "fahrenheit"}&timezone=auto`,
    )
    if (!res.ok) {
      console.log("Error fetching weather data")
      return null
    }
    const data = await res.json()
    switch (data.current.weather_code) {
      case 0:
        data.current.weather_code = "Clear"
        break
    }
    return {
      temperature: Math.round(data.current.temperature_2m),
      descriptor: convertWMOCode(data.current.weather_code),
      iconCode: data.current.weather_code,
    }
  }

  const fetchFullData = async () => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocation.lat}&longitude=${weatherLocation.lon}&hourly=temperature_2m,apparent_temperature,precipitation,cloud_cover,visibility,wind_speed_10m,uv_index&temperature_unit=${weatherIsCelsius ? "celsius" : "fahrenheit"}&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch`,
    )
    if (!res.ok) {
      console.log("Error fetching weather data")
      return null
    }
    const data = await res.json()
    const formattedData = {
      temperature: data.hourly.temperature_2m,
      apparentTemperature: data.hourly.apparent_temperature,
      precipitationProbability: data.hourly.precipitation,
      cloudCover: data.hourly.cloud_cover,
      visibility: data.hourly.visibility.map((visibility: number) => visibility / 5280),
      windSpeed: data.hourly.wind_speed_10m,
      uvIndex: data.hourly.uv_index,
      time: data.hourly.time.map((time: string) =>
        new Date(time).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }),
      ),
    }
    return formattedData
  }

  return (
    <Popover onOpenChange={handleToggle}>
      <div className="relative">
        <PopoverTrigger
          className={`group ${isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"} group cursor-pointer rounded-lg p-2 transition-colors`}
        >
          {previewState === "loading" && <Loading className="h-12 w-12 scale-[60%]" />}
          {previewState === "error" && (
            <CloudCogIcon
              className={`h-12 w-12 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
            />
          )}
          {typeof previewState === "object" && (
            <DataPreview
              isOpen={isOpen}
              temp={previewState.temperature}
              code={previewState.iconCode}
              description={previewState.descriptor}
            />
          )}
        </PopoverTrigger>
        {/* content */}

        <PopoverContent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          sideOffset={8}
          collisionPadding={16}
          className="w-auto p-3"
        >
          <Content currentState={fullState} />
        </PopoverContent>
      </div>
    </Popover>
  )
}

const DataPreview = ({
  temp,
  code,
  description,
  isOpen,
}: {
  temp: number
  code: string
  description: string
  isOpen: boolean
}) => {
  return (
    <div
      className={`flex animate-[fadeIn_.5s] items-center gap-2 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
    >
      <SunIcon className={`h-12 w-12`} />

      <h1 className={`absolute left-14 text-3xl transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}>
        {temp}&deg;
      </h1>
    </div>
  )
}
