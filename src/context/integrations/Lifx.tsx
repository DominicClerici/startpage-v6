import useChromeStorage from "@/hooks/useChromeStorage"
import { createContext } from "react"

export const LifxEnabledContext = createContext(null)
const lifxEnabledDefault = false
const LifxEnabledProvider = ({ children }) => {
  const [lifxEnabled, setLifxEnabled] = useChromeStorage("lifxEnabled", lifxEnabledDefault)
  return <LifxEnabledContext.Provider value={{ lifxEnabled, setLifxEnabled }}>{children}</LifxEnabledContext.Provider>
}

export const LifxApiKeyContext = createContext(null)
// c554cf4ba4a6ce826406378aec94b47fe838bd09b1aeed03604021b6e53d663c

const lifxApiKeyDefault = ""
const LifxApiKeyProvider = ({ children }) => {
  const [lifxApiKey, setLifxApiKey] = useChromeStorage("lifxApiKey", lifxApiKeyDefault)
  return <LifxApiKeyContext.Provider value={{ lifxApiKey, setLifxApiKey }}>{children}</LifxApiKeyContext.Provider>
}

export const LifxRecentColorsContext = createContext(null)
const lifxRecentColorsDefault = []
const LifxRecentColorsProvider = ({ children }) => {
  const [lifxRecentColors, setLifxRecentColors] = useChromeStorage("lifxRecentColors", lifxRecentColorsDefault)
  return (
    <LifxRecentColorsContext.Provider value={{ lifxRecentColors, setLifxRecentColors }}>
      {children}
    </LifxRecentColorsContext.Provider>
  )
}

export const LifxProvider = ({ children }) => {
  return (
    <LifxEnabledProvider>
      <LifxRecentColorsProvider>
        <LifxApiKeyProvider>{children}</LifxApiKeyProvider>
      </LifxRecentColorsProvider>
    </LifxEnabledProvider>
  )
}
