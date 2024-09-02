import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"
import { BackgroundSettingsProvider } from "./BackgroundSettings"

export const AutomaticDarkModeContext = createContext(null)
const AutomaticDarkModeDefault = false
const AutomaticDarkModeProvider = ({ children }) => {
  const [automaticDarkMode, setAutomaticDarkMode] = useChromeStorage("automaticDarkMode", AutomaticDarkModeDefault)

  return (
    <AutomaticDarkModeContext.Provider value={{ automaticDarkMode, setAutomaticDarkMode }}>
      {children}
    </AutomaticDarkModeContext.Provider>
  )
}

export const BackgroundMode = createContext(null)
const BackgroundModeDefault = "unsplash" // can be "solid", "gradient", "unsplash", "aura",
export const BackgroundModeProvider = ({ children }) => {
  const [backgroundMode, setBackgroundMode] = useChromeStorage("backgroundMode", BackgroundModeDefault)
  return <BackgroundMode.Provider value={{ backgroundMode, setBackgroundMode }}>{children}</BackgroundMode.Provider>
}

export const DarkModeContext = createContext(null)
const DarkModeDefault = true
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useChromeStorage("darkMode", DarkModeDefault)
  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkModeContext.Provider>
}

export const AppearanceProvider = ({ children }) => {
  return (
    <AutomaticDarkModeProvider>
      <BackgroundModeProvider>
        <BackgroundSettingsProvider>
          <DarkModeProvider>{children}</DarkModeProvider>
        </BackgroundSettingsProvider>
      </BackgroundModeProvider>
    </AutomaticDarkModeProvider>
  )
}
