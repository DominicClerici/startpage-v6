import { SolidBackgroundColorContext } from "@/context/appearance/BackgroundSettings"
import { useContext } from "react"

export const solidBackgroundColors = [
  {
    bg: { rgb: "160, 0, 0", rgbL: "255, 200, 200" }, // Red
  },
  {
    bg: { rgb: "180, 90, 0", rgbL: "255, 220, 180" }, // Orange
  },
  {
    bg: { rgb: "180, 180, 0", rgbL: "255, 255, 180" }, // Yellow
  },
  {
    bg: { rgb: "0, 120, 0", rgbL: "180, 255, 180" }, // Green
  },
  {
    bg: { rgb: "0, 100, 160", rgbL: "180, 220, 255" }, // Blue
  },
  {
    bg: { rgb: "75, 0, 130", rgbL: "220, 180, 255" }, // Indigo
  },
  {
    bg: { rgb: "128, 0, 128", rgbL: "255, 180, 255" }, // Purple
  },
  {
    bg: { rgb: "160, 0, 80", rgbL: "255, 180, 220" }, // Pink
  },
  {
    bg: { rgb: "60, 60, 60", rgbL: "200, 200, 200" }, // Dark Gray
  },
  {
    bg: { rgb: "15, 15, 15", rgbL: "240, 240, 240" }, // Near Black/White
  },
]

export default function Solid({ darkMode }: { darkMode: boolean }) {
  const { solidBackgroundColor } = useContext(SolidBackgroundColorContext)

  // Ensure solidBackgroundColor is within bounds
  const colorIndex = Math.min(Math.max(solidBackgroundColor, 0), solidBackgroundColors.length - 1)

  // Select the appropriate color based on darkMode
  const selectedColor = darkMode ? solidBackgroundColors[colorIndex].bg.rgb : solidBackgroundColors[colorIndex].bg.rgbL

  return (
    <div
      style={{ backgroundColor: `rgb(${selectedColor})` }}
      className="fixed left-0 top-0 -z-10 h-screen w-screen"
    ></div>
  )
}
