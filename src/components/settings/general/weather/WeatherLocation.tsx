import { useContext, useState } from "react"
import { UseAutomaticLocationContext, WeatherLocationContext } from "../../../../context/weather/WeatherProvider"
import { Switch } from "@/components/ui/switch"
import { TriangleAlert } from "lucide-react"

export default function WeatherLocation({ gray }: { gray: boolean }) {
  const [error, setError] = useState<null | string>(null)
  const { useAutomaticLocation, setUseAutomaticLocation } = useContext(UseAutomaticLocationContext)
  const { setWeatherLocation } = useContext(WeatherLocationContext)

  const handleCheckLocation = (e: boolean) => {
    if (e) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUseAutomaticLocation(true)
            setError(null)
            setWeatherLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              name: "Auto",
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
      setUseAutomaticLocation(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center justify-between" htmlFor="autoWeather">
        <span>
          <h2 className="text-lg">Use GPS location</h2>
          <h3 className="text-muted-foreground">Your location is not stored externally</h3>
        </span>
        <Switch id="autoWeather" checked={useAutomaticLocation} onCheckedChange={handleCheckLocation} />
      </label>
      {error && (
        <span className="-mt-2 flex animate-[fadeScaleIn_.2s_ease-out] items-center gap-2 text-destructive">
          <TriangleAlert className="h-5 w-5" /> {error}
        </span>
      )}
    </div>
  )
}
