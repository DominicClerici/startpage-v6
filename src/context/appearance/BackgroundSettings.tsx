import useChromeStorage from "@/hooks/useChromeStorage"
import { createContext } from "react"

export const SolidBackgroundColorContext = createContext(null)
const DEFAULT_solidBackgroundColor = 0
const SolidBackgroundColorProvider = ({ children }) => {
  const [solidBackgroundColor, setSolidBackgroundColor] = useChromeStorage(
    "solidBackgroundColor",
    DEFAULT_solidBackgroundColor,
  )
  return (
    <SolidBackgroundColorContext.Provider value={{ solidBackgroundColor, setSolidBackgroundColor }}>
      {children}
    </SolidBackgroundColorContext.Provider>
  )
}

export const FollowMouseContext = createContext(null)
const DEFAULT_followMouse = true
const FollowMouseProvider = ({ children }) => {
  const [followMouse, setFollowMouse] = useChromeStorage("followMouse", DEFAULT_followMouse)
  return <FollowMouseContext.Provider value={{ followMouse, setFollowMouse }}>{children}</FollowMouseContext.Provider>
}

export const AuraColorContext = createContext(null)
const DEFAULT_auraColor = 0 // can be 0 1 2 3 4 5
const AuraColorProvider = ({ children }) => {
  const [auraColor, setAuraColor] = useChromeStorage("auraColor", DEFAULT_auraColor)
  return <AuraColorContext.Provider value={{ auraColor, setAuraColor }}>{children}</AuraColorContext.Provider>
}

export const BackgroundSettingsProvider = ({ children }) => {
  return (
    <FollowMouseProvider>
      <SolidBackgroundColorProvider>
        <AuraColorProvider>{children}</AuraColorProvider>
      </SolidBackgroundColorProvider>
    </FollowMouseProvider>
  )
}
