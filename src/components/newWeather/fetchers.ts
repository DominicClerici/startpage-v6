import { getTime, parse } from "date-fns"
import { WeatherItem } from "./Weather"

const fetchData = async (lat: number, lon: number, celsius: boolean) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,weather_code,precipitation,cloud_cover,visibility,wind_speed_10m,uv_index&current=temperature_2m,apparent_temperature,weather_code&temperature_unit=${celsius ? "celsius" : "fahrenheit"}&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch&daily=sunrise,sunset&forecast_days=1`,
  )
  if (!res.ok) {
    console.log("Error fetching weather data")
    return null
  }
  const data = await res.json()

  // const forecast = Object.fromEntries(
  //   data.hourly.time.map((time, i) => [
  //     time,
  //     {
  //       temperature: data.hourly.temperature_2m[i],
  //       apparentTemperature: data.hourly.apparent_temperature[i],
  //       precipitationProbability: data.hourly.precipitation[i],
  //       cloudCover: data.hourly.cloud_cover[i],
  //       visibility: data.hourly.visibility[i] / 5280,
  //       windSpeed: data.hourly.wind_speed_10m[i],
  //       uvIndex: data.hourly.uv_index[i],
  //       code: data.hourly.weather_code[i],
  //       sunrise: data.daily.sunrise[Math.floor(i / 24)],
  //       sunset: data.daily.sunset[Math.floor(i / 24)],
  //     },
  //   ]),
  // )

  const forecast = new Map(
    data.hourly.time.map((time, i) => [
      getTime(parse(time, "yyyy-MM-dd'T'HH:mm", new Date())),
      {
        temperature: data.hourly.temperature_2m[i],
        apparentTemperature: data.hourly.apparent_temperature[i],
        precipitationProbability: data.hourly.precipitation[i],
        cloudCover: data.hourly.cloud_cover[i],
        visibility: data.hourly.visibility[i] / 5280,
        windSpeed: data.hourly.wind_speed_10m[i],
        uvIndex: data.hourly.uv_index[i],
        code: data.hourly.weather_code[i],
        sunrise: data.daily.sunrise[Math.floor(i / 24)],
        sunset: data.daily.sunset[Math.floor(i / 24)],
      },
    ]),
  ) as Map<number, WeatherItem>
  const current = {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    code: data.current.weather_code,
    timeOffset: data.utc_offset_seconds * 1000,
  }
  console.log({
    current,
    forecast,
  })
  return {
    current,
    forecast,
  }
}

export default fetchData

// 2024-10-06T00:00
