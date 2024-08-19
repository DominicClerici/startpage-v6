import { AuraColorContext, FollowMouseContext } from "@/context/appearance/BackgroundSettings"
import "./aura.css"
import { useContext, useEffect, useRef } from "react"

const auraBackgroundColors = [
  {
    bg1: { rgb: "21, 11, 26", rgbL: "188, 159, 204" },
    bg2: { rgb: "0, 17, 42", rgbL: "163, 186, 219" },
    1: { rgb: "48, 28, 59", rgbL: "195, 132, 234" },
    2: { rgb: "41, 31, 67", rgbL: "175, 142, 255" },
    3: { rgb: "32, 34, 72", rgbL: "158, 164, 255" },
    4: { rgb: "24, 36, 73", rgbL: "126, 164, 255" },
    5: { rgb: "12, 40, 71", rgbL: "88, 170, 255" },
    interactive: { rgb: "12, 49, 60", rgbL: "138, 206, 240" },
  },
  {
    bg1: { rgb: "140, 20, 52", rgbL: "237, 158, 188" },
    bg2: { rgb: "145, 102, 20", rgbL: "237, 215, 168" },
    1: { rgb: "140, 20, 52", rgbL: "237, 158, 188" },
    2: { rgb: "145, 40, 45", rgbL: "237, 176, 181" },
    3: { rgb: "150, 60, 38", rgbL: "237, 194, 174" },
    4: { rgb: "155, 80, 31", rgbL: "237, 212, 167" },
    5: { rgb: "145, 102, 20", rgbL: "237, 215, 168" },
    interactive: { rgb: "150, 60, 38", rgbL: "237, 194, 174" },
  },
  {
    bg1: { rgb: "31, 21, 75", rgbL: "168, 192, 255" },
    bg2: { rgb: "84, 96, 127", rgbL: "220, 230, 255" },
    1: { rgb: "31, 21, 75", rgbL: "168, 192, 255" },
    2: { rgb: "44, 37, 91", rgbL: "182, 203, 255" },
    3: { rgb: "57, 52, 107", rgbL: "196, 214, 255" },
    4: { rgb: "70, 68, 123", rgbL: "210, 225, 255" },
    5: { rgb: "84, 96, 127", rgbL: "220, 230, 255" },
    interactive: { rgb: "57, 52, 107", rgbL: "196, 214, 255" },
  },
  {
    bg1: { rgb: "126, 93, 22", rgbL: "255, 225, 155" },
    bg2: { rgb: "17, 96, 97", rgbL: "150, 235, 236" },
    1: { rgb: "126, 93, 22", rgbL: "255, 225, 155" },
    2: { rgb: "99, 94, 47", rgbL: "226, 228, 180" },
    3: { rgb: "71, 95, 72", rgbL: "197, 231, 205" },
    4: { rgb: "44, 96, 97", rgbL: "168, 234, 235" },
    5: { rgb: "17, 96, 97", rgbL: "150, 235, 236" },
    interactive: { rgb: "71, 95, 72", rgbL: "197, 231, 205" },
  },
  {
    bg1: { rgb: "31, 47, 125", rgbL: "159, 177, 253" },
    bg2: { rgb: "126, 35, 53", rgbL: "254, 163, 184" },
    1: { rgb: "31, 47, 125", rgbL: "159, 177, 253" },
    2: { rgb: "55, 44, 107", rgbL: "183, 171, 235" },
    3: { rgb: "78, 41, 89", rgbL: "207, 165, 217" },
    4: { rgb: "102, 38, 71", rgbL: "231, 159, 199" },
    5: { rgb: "126, 35, 53", rgbL: "254, 163, 184" },
    interactive: { rgb: "78, 41, 89", rgbL: "207, 165, 217" },
  },
  {
    bg1: { rgb: "40, 40, 40", rgbL: "220, 220, 220" },
    bg2: { rgb: "80, 80, 80", rgbL: "240, 240, 240" },
    1: { rgb: "25, 25, 25", rgbL: "220, 220, 220" },
    2: { rgb: "30, 30, 30", rgbL: "200, 200, 200" },
    3: { rgb: "50, 50, 50", rgbL: "180, 180, 180" },
    4: { rgb: "70, 70, 70", rgbL: "160, 160, 160" },
    5: { rgb: "90, 90, 90", rgbL: "140, 140, 140" },
    interactive: { rgb: "50, 50, 50", rgbL: "180, 180, 180" },
  },
]

const Aura = ({ darkMode }) => {
  const interactive = useRef(null)
  const { followMouse } = useContext(FollowMouseContext)
  const { auraColor } = useContext(AuraColorContext)

  useEffect(() => {
    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    function move() {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      if (interactive.current) {
        interactive.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
        requestAnimationFrame(() => {
          move()
        })
      }
    }

    move()
    const handleMouseMove = (event: any) => {
      tgX = event.clientX
      tgY = event.clientY
    }
    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [followMouse])

  useEffect(() => {
    // Ensure auraColor is within the valid range
    const colorScheme = auraBackgroundColors[auraColor] || auraBackgroundColors[0]

    Object.entries(colorScheme).forEach(([key, value]) => {
      const colorValue = darkMode ? value.rgb : value.rgbL
      document.documentElement.style.setProperty(`--color-${key}`, colorValue)
    })
    // remove all properties
  }, [auraColor, darkMode])

  return (
    <div className={`gradient-bg ${!darkMode && "lightC"}`}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div ref={interactive} className="interactive"></div>
      </div>
    </div>
  )
}

export default Aura
