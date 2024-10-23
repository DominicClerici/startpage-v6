import { WeatherIsCelsiusContext } from "@/context/weather/WeatherProvider"
import { SunIcon, ThermometerIcon, DropletIcon, SunriseIcon, SunsetIcon, CircleIcon } from "lucide-react"
import { useContext } from "react"
import { Button } from "../ui/button"
import { format } from "date-fns"

interface OverviewProps {
  data: {
    temperature: number
    apparentTemperature: number
    precipitationProbability: number
    code: number
    uvIndex: number
    sunrise: string
    sunset: string
  }
  selectedChartView: string
  setSelectedChartView: React.Dispatch<React.SetStateAction<string>>
  lat: number
  lon: number
}

const WeatherOverview = ({ data, lat, lon, setSelectedChartView, selectedChartView }: OverviewProps) => {
  const { weatherIsCelsius } = useContext(WeatherIsCelsiusContext)
  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      <div className="flex items-center gap-2 pl-4">
        <SunIcon className="h-9 w-9" />
        <div>
          <h2>{data.code}</h2>
          <h1 className="flex items-start font-inter text-2xl font-semibold leading-none">
            {Math.round(data.temperature)}{" "}
            <span className="text-sm font-light leading-none text-muted-foreground">
              {weatherIsCelsius ? <>&deg;C</> : <>&deg;F</>}
            </span>
          </h1>
        </div>

        <Button
          onClick={() => {
            window.open(`https://forecast.weather.gov/MapClick.php?lon=${lon}&lat=${lat}`)
          }}
          variant="link"
          className="ml-auto"
        >
          View on NWS
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => {
            setSelectedChartView("apparentTemperature")
          }}
          className={`${selectedChartView == "apparentTemperature" ? "bg-hover" : "hover:bg-hover"} flex cursor-pointer items-center justify-center gap-1 rounded-md border py-2 transition-colors duration-75`}
        >
          <ThermometerIcon className="h-7 w-7" />
          <div>
            <p className="text-sm text-muted-foreground">Feels like</p>
            <p className="flex items-start font-inter text-xl">
              <span className="leading-none">{Math.round(data.apparentTemperature)}</span>
              <span className="text-sm font-light leading-none text-muted-foreground">
                {weatherIsCelsius ? <>&deg;C</> : <>&deg;F</>}
              </span>
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setSelectedChartView("uvIndex")
          }}
          className={`${selectedChartView == "uvIndex" ? "bg-hover" : "hover:bg-hover"} flex cursor-pointer items-center justify-center gap-1 rounded-md border py-2 transition-colors duration-75`}
        >
          <CircleIcon className="h-7 w-7" />
          <div>
            <p className="text-sm text-muted-foreground">UV Index</p>
            <p className="flex items-start font-inter text-xl">
              <span className="leading-none">{Math.round(data.uvIndex)}</span>
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setSelectedChartView("precipitationProbability")
          }}
          className={`${selectedChartView == "precipitationProbability" ? "bg-hover" : "hover:bg-hover"} flex cursor-pointer items-center justify-center gap-1 rounded-md border py-2 transition-colors duration-75`}
        >
          <DropletIcon className="h-7 w-7" />
          <div>
            <p className="text-sm text-muted-foreground">Rain odds</p>
            <p className="flex items-center font-inter text-xl">
              <span className="leading-none">{data.precipitationProbability}</span>
              <span className="text-sm font-light leading-none text-muted-foreground">%</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center gap-1 rounded-md border py-2">
          <SunriseIcon className="h-7 w-7" />
          <div>
            <p className="text-sm text-muted-foreground">Sunrise</p>
            <p className="flex items-end font-inter text-lg">
              <span className="leading-none">{format(data.sunrise, "h:mm")}</span>
              <span className="text-xs font-light leading-none text-muted-foreground">{format(data.sunrise, "a")}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 rounded-md border py-2">
          <SunsetIcon className="h-7 w-7" />
          <div>
            <p className="text-sm text-muted-foreground">Sunset</p>
            <p className="flex items-end font-inter text-lg">
              <span className="leading-none">{format(data.sunset, "h:mm")}</span>
              <span className="text-xs font-light leading-none text-muted-foreground">{format(data.sunset, "a")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherOverview
