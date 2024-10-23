import { WeatherLocationOptions, WeatherLocationContext } from "@/context/weather/WeatherProvider"
import { TooltipPortal } from "@radix-ui/react-tooltip"
import { LocateFixedIcon } from "lucide-react"
import { useContext, useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

const LocationSelector = ({ locId }: { locId: string }) => {
  const { weatherLocationOptions } = useContext(WeatherLocationOptions)
  const { setWeatherLocation } = useContext(WeatherLocationContext)
  const [canUseGPS, setCanUseGPS] = useState(false)

  useEffect(() => {
    try {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "granted") {
          setCanUseGPS(true)
        } else {
          setCanUseGPS(false)
        }
      })
    } catch (error) {
      console.error("Error checking geolocation permission:", error)
      setCanUseGPS(false)
    }
  }, [])

  const setToAutomatic = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWeatherLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: "auto",
            id: "auto",
          })
        },
        (error) => {
          if (error.code === 1) {
            setCanUseGPS(false)
          } else {
            setCanUseGPS(false)
          }
        },
      )
    } else {
      setCanUseGPS(false)
    }
  }

  return (
    <div className="flex items-center border-b">
      <Select
        value={locId}
        onValueChange={(e) => {
          if (e === "auto") {
            setToAutomatic()
          } else {
            setWeatherLocation(weatherLocationOptions.find((loc) => loc.id === e))
          }
        }}
      >
        <SelectTrigger className="rounded-b-none border-0 transition-colors duration-75 hover:bg-hover">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="relative">
          {canUseGPS ? (
            <SelectItem value="auto">
              <div className="flex items-center gap-2">
                <LocateFixedIcon className="h-5 w-5" />
                GPS Location
              </div>
            </SelectItem>
          ) : (
            <DisabledGPS />
          )}
          <SelectGroup>
            <SelectLabel className="text-muted-foreground">Your locations</SelectLabel>
            {weatherLocationOptions.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const DisabledGPS = () => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div>
          <SelectItem value="auto" disabled>
            <div className="flex items-center gap-2">
              GPS Location <LocateFixedIcon className="h-5 w-5" />
            </div>
          </SelectItem>
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>Enable GPS access in settings to use GPS location</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}

export default LocationSelector
