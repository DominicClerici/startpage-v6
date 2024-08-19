import { useContext, useRef, useState } from "react"
import {
  UseAutomaticLocationContext,
  WeatherLocationContext,
  WeatherLocationOptions,
} from "../../../../context/weather/WeatherProvider"
import AnimateUnmount from "../../../lib/AnimateUnmount"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, PlusIcon, TriangleAlert, X } from "lucide-react"
import { Input } from "@/components/ui/input"

const CircleIconWithCheck = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM8.75 14.1667L4.16667 9.58333L5.83333 8.41667L8.75 11.3333L14.1667 5.83333L15.8333 7.08333L8.75 14.1667Z"
      />
    </svg>
  )
}

const CircleIconNoCheck = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 1.66667C14.602 1.66667 18.3333 5.398 18.3333 10C18.3333 14.602 14.602 18.3333 10 18.3333C5.398 18.3333 1.66667 14.602 1.66667 10C1.66667 5.398 5.398 1.66667 10 1.66667Z"
      />
    </svg>
  )
}

export default function WeatherLocationList({ gray }: { gray: boolean }) {
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { weatherLocationOptions, setWeatherLocationOptions } = useContext(WeatherLocationOptions)
  const { weatherLocation, setWeatherLocation } = useContext(WeatherLocationContext)
  const { useAutomaticLocation } = useContext(UseAutomaticLocationContext)
  const latRef = useRef(null)
  const lonRef = useRef(null)
  const nameRef = useRef(null)

  const handleAddLocation = () => {
    if (!latRef.current || !lonRef.current || !nameRef.current) {
      return
    }
    const lat = parseFloat(latRef.current.value)
    const lon = parseFloat(lonRef.current.value)
    const name = nameRef.current.value
    if (typeof lat !== "number" || isNaN(lat)) {
      setError("Latitude is required")
      return
    }
    if (lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90")
      return
    }
    if (typeof lon !== "number" || isNaN(lon)) {
      setError("Longitude is required")
      return
    }
    if (lon < -180 || lon > 180) {
      setError("Longitude must be between -180 and 180")
      return
    }
    if (name.length < 1) {
      setError("Name is required")
      return
    }
    // name must be unqiue and not already in the list
    if (weatherLocationOptions.find((loc) => loc.name === name)) {
      setError("Location must have unique name")
      return
    }
    setWeatherLocationOptions([...weatherLocationOptions, { lat, lon, name }])
    latRef.current.value = ""
    lonRef.current.value = ""
    nameRef.current.value = ""
    setError(null)
    setIsAdding(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddLocation()
    } else if (e.key === "Escape") {
      setIsAdding(false)
    }
  }

  return (
    <Card
      className={`rounded-lg border bg-card p-0 transition-opacity ${(gray || useAutomaticLocation) && "pointer-events-none opacity-30"}`}
    >
      <CardHeader className="p-4">
        <div className="flex justify-between">
          <span>
            <CardTitle>Weather locations</CardTitle>
            <CardDescription>Add custom saved locations</CardDescription>
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              setIsAdding(!isAdding)
              setError(null)
            }}
          >
            {isAdding ? "Cancel" : "Add location"}
          </Button>
        </div>
        <AnimateUnmount
          active={isAdding}
          animationOpen="fadeIn"
          animationClose="fadeOut"
          openDuration="200ms"
          closeDuration="100ms"
        >
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <label className="flex-grow">
                <p className="text-muted-foreground">Latitude:</p>
                <Input onKeyDown={handleKeyDown} ref={latRef} />
              </label>
              <label className="flex-grow">
                <p className="text-muted-foreground">Longitude:</p>
                <Input onKeyDown={handleKeyDown} ref={lonRef} />
              </label>
            </span>
            <span className="flex items-center gap-2">
              <label className="flex-grow">
                <p className="text-muted-foreground">Location name</p>
                <Input onKeyDown={handleKeyDown} ref={nameRef} />
              </label>
              <label>
                <p className="invisible">.</p>
                <Button onClick={handleAddLocation} size="icon" variant="secondary">
                  <PlusIcon />
                </Button>
              </label>
            </span>
            {error && (
              <span className="flex animate-[fadeScaleIn_.2s_ease-out] items-center gap-2 text-destructive">
                <TriangleAlert className="h-5 w-5" /> {error}
              </span>
            )}
          </div>
        </AnimateUnmount>
      </CardHeader>
      <CardContent className={`flex flex-col gap-2 px-4 pt-0 ${weatherLocationOptions.length !== 0 ? "pb-2" : "pb-0"}`}>
        {weatherLocationOptions.map((location, i) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <span className="peer order-2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setWeatherLocation(location)
                  }}
                >
                  <div>{weatherLocation.name === location.name ? <CheckCircle2 /> : <Circle />}</div>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setWeatherLocationOptions(weatherLocationOptions.filter((_, index) => index !== i))
                  }}
                >
                  <X />
                </Button>
              </span>
              <p className="order-1 w-4/5 overflow-hidden truncate overflow-ellipsis text-lg text-muted-foreground peer-hover:text-foreground">
                {location.name}
              </p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
