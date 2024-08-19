import { BackgroundMode, DarkModeContext } from "@/context/appearance/Appearance"
import { useContext } from "react"
import Aura from "./variants/Aura"
import Solid from "./variants/Solid"

export default function Background() {
  const { backgroundMode } = useContext(BackgroundMode)
  const { darkMode } = useContext(DarkModeContext)
  if (backgroundMode === "aura") {
    return <Aura darkMode={darkMode} />
  }
  if (backgroundMode === "solid") {
    return <Solid darkMode={darkMode} />
  }
  return <div className="fixed inset-0 -z-50 bg-background"></div>
}
