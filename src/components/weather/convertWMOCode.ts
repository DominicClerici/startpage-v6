export default function convertWMOCode(code: number) {
  switch (code) {
    case 0:
      return "Clear"
    case 1:
      return "Mostly clear"
    case 2:
      return "Partly cloudy"
    case 3:
      return "Cloudy"
    case 45:
      return "Foggy"
    case 48:
      return "Rime fog"
    case 51:
      return "Light drizzle"
    case 53:
      return "Drizzle"
    case 55:
      return "Dense drizzle"
    case 56:
      return "Light freezing drizzle"
    case 57:
      return "Freezing drizzle"
    case 61:
      return "Light rain"
    case 63:
      return "Rain"
    case 65:
      return "Heavy rain"
    case 66:
      return "Light freezing rain"
    case 67:
      return "Freezing rain"
    case 71:
      return "Light snow"
    case 73:
      return "Snow"
    case 75:
      return "Heavy snow"
    case 77:
      return "Snow grains"
    case 80:
      return "Light showers"
    case 81:
      return "Rain showers"
    case 82:
      return "Heavy showers"
    case 85:
      return "Light snow showers"
    case 86:
      return "Heavy snow showers"
    case 95:
      return "Thunder"
    case 96:
      return "Heavy thunder"
    case 99:
      return "Thunder"
    default:
      return null
  }
}
