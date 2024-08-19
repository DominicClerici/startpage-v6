// WeatherChart.js
import { useEffect, useMemo, useState } from "react"
import { AreaChart, Area, XAxis, Tooltip, YAxis, ReferenceLine } from "recharts"
import { ArrowUpSVG } from "./Icons"
import { CustomLabel, CustomTick, CustomTooltip } from "./CustomParts"
import DaySelector from "./DaySelector"

function getNextSevenDays() {
  const days = ["Today"]
  const today = new Date()
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  for (let i = 1; i < 7; i++) {
    const nextDay = new Date(today)
    nextDay.setDate(today.getDate() + i)
    const dayObj = {
      month: monthNames[nextDay.getMonth()],
      day: nextDay.getDate(),
    }
    // @ts-ignore
    days.push(dayObj)
  }

  return days
}

const days = getNextSevenDays()

export default function WeatherChart({
  data,
  times,
  colorFunction,
  isFlattening,
  unit,
  roundLess = false,
  minColor,
  maxColor,
}: {
  data: number[]
  times: string[]
  colorFunction?: (temp: number) => string
  isFlattening: boolean
  unit: string
  roundLess?: boolean
  minColor?: string
  maxColor?: string
}) {
  const [currentDay, setCurrentDay] = useState(0) // 0 is today
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const chartData = useMemo(
    () =>
      data.map((temp, i) => {
        return {
          name: times[i],
          temp: temp,
        }
      }),
    [data, times],
  )

  const roundFunction = (num) => {
    if (!roundLess) {
      return Math.round(num)
    } else {
      return Math.round(num * 10) / 10
    }
  }

  const currentChartData = useMemo(
    () => chartData.slice(currentDay * 24, currentDay * 24 + 24),
    [currentDay, chartData],
  )

  const minTemp = useMemo(() => Math.min(...currentChartData.map((d) => d.temp)), [currentChartData])
  const maxTemp = useMemo(() => Math.max(...currentChartData.map((d) => d.temp)), [currentChartData])

  const domainMin = minTemp - 5 > 0 ? minTemp - 5 : 0

  if (colorFunction) {
    minColor = useMemo(() => colorFunction(minTemp), [minTemp, colorFunction])
    maxColor = useMemo(() => colorFunction(maxTemp), [maxTemp, colorFunction])
  }

  const dataAllZeroes = useMemo(
    () =>
      currentChartData.map((d) => {
        return {
          name: d.name,
          temp: 0,
        }
      }),
    [currentChartData],
  )

  const getCurrentTimeIndex = () => {
    const now = new Date()
    const currentHour = now.getHours()
    return currentHour
  }

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 rounded-lg border p-1">
        {days.map((day, i) => (
          <DaySelector key={`ds_${i}`} currentDay={currentDay} setCurrentDay={setCurrentDay} i={i} time={day} />
        ))}
      </div>
      <div className="mb-2 flex items-center justify-between rounded-lg border p-2">
        <span className="relative text-3xl font-semibold leading-none">
          {hoveredIndex !== null ? (
            <>
              {roundFunction(hoveredIndex.temp)}
              {unit}
              <span className="absolute left-0 top-full -mt-1 w-24 text-sm font-medium text-muted-foreground">
                {hoveredIndex.name}
              </span>
            </>
          ) : (
            <>
              {roundFunction(currentChartData[getCurrentTimeIndex()].temp)}
              {unit}
            </>
          )}
        </span>
        <div className="text-muted-foreground">
          <span className="flex items-center gap-1">
            <ArrowUpSVG /> {roundFunction(maxTemp)}
            {unit}
          </span>
          <span className="flex items-center gap-1">
            <div className="rotate-180">
              <ArrowUpSVG />
            </div>
            {roundFunction(minTemp)}
            {unit}
          </span>
        </div>
      </div>
      <div className="rounded-lg border">
        <AreaChart
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          onMouseMove={(e) => {
            if (e && e.activePayload) {
              setHoveredIndex(e.activePayload[0].payload)
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
          width={400}
          height={200}
          data={isFlattening ? dataAllZeroes : currentChartData}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={maxColor} />
              <stop offset="100%" stopColor={minColor} />
            </linearGradient>
          </defs>
          {/* @ts-ignore */}
          <XAxis tick={<CustomTick />} dataKey={"name"} interval={6} />
          <YAxis hide domain={[domainMin, maxTemp + 5]} />
          <ReferenceLine
            x={currentChartData[getCurrentTimeIndex()].name}
            strokeWidth={2}
            strokeLinecap="round"
            stroke="#dddddd"
            strokeDasharray="125"
            // @ts-ignore
            label={<CustomLabel />}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            animationDuration={350}
            type="monotone"
            dataKey="temp"
            stroke="#ffffff90"
            strokeWidth={3}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </div>
    </div>
  )
}
