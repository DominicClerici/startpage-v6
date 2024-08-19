import { lazy, Suspense, useState } from "react"
import Loading from "../../lib/Loading"
import * as Tabs from "@radix-ui/react-tabs"
import ViewSelector from "./ViewSelector"
import { TriangleAlert } from "lucide-react"
const WeatherChart = lazy(() => import("./WeatherChart"))

// import WeatherChart from "./WeatherChart"

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

const getColorForTemperature = (temp) => {
  if (temp < 20) return "#d6eeff"
  if (temp < 30) return "#99d5ff"
  if (temp < 40) return "#63beff"
  if (temp < 50) return "#0194FD"
  if (temp < 60) return "#73FEF0"
  if (temp < 70) return "#DFF96A"
  if (temp < 80) return "#FDE764"
  if (temp < 90) return "#FC9243"
  return "#FE1623"
}
const getColorForUV = (uv) => {
  if (uv < 3) return "#34d100"
  if (uv < 6) return "#c0d100"
  if (uv < 8) return "#e86c00"
  if (uv < 11) return "#d18100"
  return "#d10000"
}

export default function Content({ currentState }: { currentState: string | FullData }) {
  const [currentView, setCurrentView] = useState("temperature")
  const [isFlattening, setIsFlattening] = useState(false)
  if (typeof currentState === "string") {
    if (currentState === "loading") {
      return (
        <div className="flex h-[400px] w-[402px] items-center justify-center">
          <Loading className="h-24 w-24 text-muted-foreground" />
        </div>
      )
    }
    return (
      <span className="flex w-max items-center gap-2 rounded border border-red-500 bg-red-600/60 p-2 text-red-200">
        <TriangleAlert />
        {currentState}
      </span>
    )
  }
  return (
    <div className="relative min-w-52">
      <ViewSelector
        currentView={currentView}
        setCurrentView={(e) => {
          setCurrentView(e)
          setIsFlattening(true)
          setTimeout(() => {
            setIsFlattening(false)
          }, 650)
        }}
      />
      <div className="relative mt-2">
        <Tabs.Root value={currentView}>
          <Tabs.Content className="weatherContentTab" value="temperature">
            <Suspense fallback={<div className="h-[348px] w-[402px]"></div>}>
              <WeatherChart
                unit={"°"}
                colorFunction={getColorForTemperature}
                isFlattening={isFlattening}
                times={currentState.time}
                data={currentState.temperature}
              />
            </Suspense>
          </Tabs.Content>
          <Tabs.Content className="weatherContentTab" value="feelsLike">
            <WeatherChart
              unit={"°"}
              colorFunction={getColorForTemperature}
              isFlattening={isFlattening}
              times={currentState.time}
              data={currentState.apparentTemperature}
            />
          </Tabs.Content>
          <Tabs.Content className="weatherContentTab" value="precipProb">
            <WeatherChart
              unit={"%"}
              minColor={"#12167F"}
              maxColor={"#1733A8"}
              isFlattening={isFlattening}
              times={currentState.time}
              data={currentState.precipitationProbability}
            />
          </Tabs.Content>
          <Tabs.Content className="weatherContentTab" value="cloudCover">
            <WeatherChart
              unit={"%"}
              minColor={"#D1DFF6"}
              maxColor={"#92B6F0"}
              isFlattening={isFlattening}
              times={currentState.time}
              data={currentState.cloudCover}
            />
          </Tabs.Content>
          <Tabs.Content className="weatherContentTab" value="visibility">
            <WeatherChart
              unit={"mi"}
              roundLess
              minColor={"#D1DFF6"}
              maxColor={"#92B6F0"}
              isFlattening={isFlattening}
              times={currentState.time}
              data={currentState.visibility}
            />
          </Tabs.Content>
          <Tabs.Content className="weatherContentTab" value="uv">
            <WeatherChart
              unit={""}
              colorFunction={getColorForUV}
              isFlattening={isFlattening}
              times={currentState.time}
              data={currentState.uvIndex}
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
