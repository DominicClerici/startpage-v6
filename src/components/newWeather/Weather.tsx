import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import exampleData from "./exampleData"
import { WeatherIsCelsiusContext, WeatherLocationContext } from "@/context/weather/WeatherProvider"
import LocationSelector from "./LocationSelector"
import { format } from "date-fns"
import WeatherOverview from "./WeatherOverview"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Area, AreaChart, ReferenceLine, XAxis, YAxis } from "recharts"
import { ClockSVG } from "../weather/content/Icons"
import fetchData from "./fetchers"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CircleIcon, CloudIcon, ConstructionIcon, Droplet, EyeIcon, Thermometer, WindIcon } from "lucide-react"
import WeatherSkeleton from "./WeatherSkeleton"

export type WeatherItem = {
  temperature: number
  apparentTemperature: number
  precipitationProbability: number
  cloudCover: number
  code: number
  visibility: number
  windSpeed: number
  uvIndex: number
  sunrise: string
  sunset: string
}
type CurrentItem = {
  temperature: number
  apparentTemperature: number
  code: number
  timeOffset: number
}
type WeatherData = {
  current: CurrentItem
  forecast: Map<number, WeatherItem>
}
// The key is time
export default function Weather() {
  const [data, setData] = useState<WeatherData>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { weatherLocation } = useContext(WeatherLocationContext)
  const { weatherIsCelsius } = useContext(WeatherIsCelsiusContext)

  useEffect(() => {
    fetchData(weatherLocation.lat, weatherLocation.lon, weatherIsCelsius).then((data) => {
      setData(data)
      // setIsLoading(false)
    })
  }, [weatherLocation.id])

  return (
    <Popover defaultOpen={false}>
      <div className="relative">
        <PopoverTrigger>Open weather</PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          className="min-w-96 p-0"
        >
          {data && <WeatherContent isLoading={isLoading} data={data} />}
        </PopoverContent>
      </div>
    </Popover>
  )
}

interface WeatherContentProps {
  data: WeatherData
  isLoading: boolean
}

const colorMap = {
  temperature: "#fcb103",
  apparentTemperature: "#2563eb",
  precipitationProbability: "#2563eb",
  cloudCover: "#2563eb",
  visibility: "#2563eb",
  windSpeed: "#2563eb",
  uvIndex: "#2563eb",
}
const labelMap = {
  temperature: "Temp",
  apparentTemperature: "Feels like",
  precipitationProbability: "% Rain",
  cloudCover: "Cloud Cover",
  visibility: "Visibility",
  windSpeed: "Wind Speed",
  uvIndex: "UV Index",
}

const WeatherContent = ({ data, isLoading }: WeatherContentProps) => {
  const { weatherLocation } = useContext(WeatherLocationContext)
  const [selectedChartView, setSelectedChartView] = useState("temperature")

  const currentMs = useMemo(() => {
    const now = new Date()
    return Math.round(now.getTime() / 1000 / 3600) * 3600 * 1000
  }, [])

  const userOffset = new Date().getTimezoneOffset() * 60 * 1000
  const chartData = Array.from(data.forecast.entries()).map(([key, value]) => {
    return {
      [selectedChartView]: value[selectedChartView],
      time: format(new Date(key + data.current.timeOffset + userOffset), "h:mma"),
    }
  })

  return (
    <div className="flex flex-col">
      <LocationSelector locId={weatherLocation.id as string} />
      {isLoading ? (
        <WeatherSkeleton />
      ) : (
        <>
          <WeatherOverview
            selectedChartView={selectedChartView}
            lat={weatherLocation.lat}
            lon={weatherLocation.lon}
            setSelectedChartView={setSelectedChartView}
            data={{
              temperature: data.current.temperature,
              apparentTemperature: data.current.apparentTemperature,
              precipitationProbability: data.forecast.get(currentMs).precipitationProbability,
              uvIndex: data.forecast.get(currentMs).uvIndex,
              code: data.current.code,
              sunrise: data.forecast.get(currentMs).sunrise,
              sunset: data.forecast.get(currentMs).sunset,
            }}
          />
          <WeatherGraphSelector setSelectedChartView={setSelectedChartView} selectedChartView={selectedChartView} />
          <WeatherGraph
            userOffset={userOffset}
            offset={data.current.timeOffset}
            chartConfig={{
              [selectedChartView]: {
                label: labelMap[selectedChartView],
                color: colorMap[selectedChartView],
              },
            }}
            current={currentMs}
            data={chartData}
            chartValue={selectedChartView}
          />
        </>
      )}
    </div>
  )
}

const WeatherGraphSelector = ({
  setSelectedChartView,
  selectedChartView,
}: {
  selectedChartView: string
  setSelectedChartView: (e: string) => void
}) => {
  return (
    <div className="mt-4 px-2">
      <Select value={selectedChartView} onValueChange={setSelectedChartView}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="temperature">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature
            </div>
          </SelectItem>
          <SelectItem value="apparentTemperature">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Feels like
            </div>
          </SelectItem>
          <SelectItem value="precipitationProbability">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              Rain chance
            </div>
          </SelectItem>
          <SelectItem value="cloudCover">
            <div className="flex items-center gap-2">
              <CloudIcon className="h-5 w-5" />
              Cloud cover
            </div>
          </SelectItem>
          <SelectItem value="visibility">
            <div className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Visibility
            </div>
          </SelectItem>
          <SelectItem value="windSpeed">
            <div className="flex items-center gap-2">
              <WindIcon className="h-5 w-5" />
              Wind speed
            </div>
          </SelectItem>
          <SelectItem value="uvIndex">
            <div className="flex items-center gap-2">
              <CircleIcon className="h-5 w-5" />
              UV Index
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

const colorRanges = {
  temperature: {
    values: {
      0: [38, 76, 255], // 0 deg f
      1: [63, 160, 255],
      2: [114, 216, 255],
      3: [170, 247, 255],
      4: [224, 255, 255],
      5: [255, 255, 191], // 55 deg f
      6: [255, 224, 153],
      7: [255, 173, 114],
      8: [247, 109, 94],
      9: [216, 38, 50],
      10: [165, 0, 33], // 110 deg f
    },
    min: 0,
    max: 110,
  },
  apparentTemperature: {
    values: {
      0: [38, 76, 255], // 0 deg f
      1: [63, 160, 255],
      2: [114, 216, 255],
      3: [170, 247, 255],
      4: [224, 255, 255],
      5: [255, 255, 191], // 55 deg f
      6: [255, 224, 153],
      7: [255, 173, 114],
      8: [247, 109, 94],
      9: [216, 38, 50],
      10: [165, 0, 33], // 110 deg f
    },
    min: 0,
    max: 110,
  },
  precipitationProbability: {
    values: {
      0: [255, 255, 255],
      1: [255, 255, 255],
      2: [255, 255, 255],
      3: [255, 255, 255],
      4: [255, 255, 255],
      5: [255, 255, 255],
      6: [255, 255, 255],
      7: [255, 255, 255],
      8: [255, 255, 255],
      9: [255, 255, 255],
      10: [255, 255, 255],
    },
    min: 0,
    max: 100,
  },
  uvIndex: {
    values: {
      0: [0, 255, 0],
      1: [51, 255, 0],
      2: [102, 255, 0],
      3: [153, 255, 0],
      4: [204, 255, 0],
      5: [255, 255, 0],
      6: [255, 204, 0],
      7: [255, 153, 0],
      8: [255, 102, 0],
      9: [255, 51, 0],
      10: [255, 0, 0],
    },
    min: 0,
    max: 10,
  },
  cloudCover: {
    // ease between these two colors
    values: {
      0: [167, 254, 255],
      1: [156, 234, 235],
      2: [145, 214, 215],
      3: [134, 194, 195],
      4: [123, 174, 175],
      5: [112, 154, 155],
      6: [101, 134, 135],
      7: [90, 114, 115],
      8: [79, 94, 95],
      9: [74, 74, 74],
    },
    min: 0,
    max: 100,
  },
  windSpeed: {
    values: {
      0: [255, 255, 255],
      1: [255, 255, 255],
      2: [255, 255, 255],
      3: [255, 255, 255],
      4: [255, 255, 255],
      5: [255, 255, 255],
      6: [255, 255, 255],
      7: [255, 255, 255],
      8: [255, 255, 255],
      9: [255, 255, 255],
      10: [255, 255, 255],
    },
    min: 0,
    max: 50,
  },
  visibility: {
    // ease between these two colors
    values: {
      0: [74, 74, 74],
      1: [79, 94, 95],
      2: [90, 114, 115],
      3: [101, 134, 135],
      4: [112, 154, 155],
      5: [123, 174, 175],
      6: [134, 194, 195],
      7: [145, 214, 215],
      8: [156, 234, 235],
      9: [167, 254, 255],
    },
    min: 0,
    max: 50,
  },
}

const interpolate = (color1: number[], color2: number[], factor: number) => {
  return color1.map((channel, index) => Math.round(channel + factor * (color2[index] - channel)))
}

const createGradient = (range: { [key: number]: number[] }, items: number[], minTemp, maxTemp) => {
  const upperIndex = Object.keys(range).length - 1
  const normalized = items.map((item) => {
    const norm = ((item - minTemp) / (maxTemp - minTemp)) * (upperIndex + 1)
    return norm < 0 ? 0 : norm > upperIndex ? upperIndex : Math.round(norm * 10) / 10
  })
  const minNorm = Math.min(...normalized)
  const maxNorm = Math.max(...normalized)

  const alreadyInterpolated = new Set()
  const interpolated = []

  normalized.map((item) => {
    if (alreadyInterpolated.has(item)) return
    const lowerKey = Math.floor(item)
    const upperKey = Math.ceil(item)
    const factor = item - lowerKey
    if (lowerKey === upperKey) {
      interpolated.push([item, range[lowerKey]])
    } else {
      const pos = Math.round(((maxNorm - item) / (maxNorm - minNorm)) * 10) * 10
      interpolated.push([pos, interpolate(range[lowerKey], range[upperKey], factor)])
    }
    alreadyInterpolated.add(item)
  })

  interpolated.sort((a, b) => a[0] - b[0])

  const stops = interpolated.map((item, index) => {
    return <stop key={`${index}_${item[1].join(".")}`} offset={`${item[0]}%`} stopColor={`rgb(${item[1].join(",")})`} />
  })
  return (
    <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
      {stops}
    </linearGradient>
  )
}

const WeatherGraph = ({
  data,
  chartValue,
  current,
  offset,
  userOffset,
  chartConfig,
}: {
  data: {
    [x: string]: any
    time: string
  }[]
  chartValue: string
  current: number
  offset: number
  userOffset: number
  chartConfig: ChartConfig
}) => {
  const [initialAnimComplete, setInitialAnimComplete] = useState(false)
  const values = data.map((d) => d[chartValue])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const domainMin = min - 5 > 0 ? min - 5 : 0
  const xAxisRef = format(new Date(current + offset + userOffset), "h:mma")

  return (
    <div className="px-2 py-2">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full rounded-lg border">
        <AreaChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
          <defs>
            {createGradient(
              colorRanges[chartValue].values,
              values,
              colorRanges[chartValue].min,
              colorRanges[chartValue].max,
            )}
          </defs>

          <XAxis dataKey={"time"} tickLine={false} axisLine={false} interval={6} />
          <YAxis hide domain={[domainMin, max + 5]} />
          <ReferenceLine
            x={xAxisRef}
            strokeWidth={2}
            strokeLinecap="round"
            stroke="#a1a1aa"
            strokeDasharray="140"
            // @ts-ignore
            label={<CustomLabel />}
          />
          <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
          <Area
            onAnimationEnd={() => {
              if (!initialAnimComplete) {
                setInitialAnimComplete(true)
              }
            }}
            activeDot={{ fill: "white", stroke: "white", strokeWidth: 2 }}
            type="monotone"
            animationDuration={initialAnimComplete ? 500 : 1000}
            dataKey={chartValue}
            fill="url(#temperatureGradient)"
            stroke={`url(#temperatureGradient)`}
            fillOpacity={0.6}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export const CustomLabel = ({ viewBox }) => {
  const { x, y } = viewBox
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-12" y="0" width="24" height="24">
        <ClockSVG />
      </foreignObject>
    </g>
  )
}
