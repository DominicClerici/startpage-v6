import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const ShowGreetingContext = createContext(null)
const defualtGreeting = true
const ShowGreetingProvider = ({ children }) => {
  const [showGreeting, setShowGreeting] = useChromeStorage("showGreeting", defualtGreeting)
  return (
    <ShowGreetingContext.Provider value={{ showGreeting, setShowGreeting }}>{children}</ShowGreetingContext.Provider>
  )
}

export const CustomGreetingContext = createContext(null)
const defaultCustomGreeting = ""
const CustomGreetingProvider = ({ children }) => {
  const [customGreeting, setCustomGreeting] = useChromeStorage("customGreeting", defaultCustomGreeting)
  return (
    <CustomGreetingContext.Provider value={{ customGreeting, setCustomGreeting }}>
      {children}
    </CustomGreetingContext.Provider>
  )
}

export const MantraEnabledContext = createContext(null)
const defaultMantraEnabled = true
const MantraEnabledProvider = ({ children }) => {
  const [mantraEnabled, setMantraEnabled] = useChromeStorage("mantraEnabled", defaultMantraEnabled)
  return (
    <MantraEnabledContext.Provider value={{ mantraEnabled, setMantraEnabled }}>
      {children}
    </MantraEnabledContext.Provider>
  )
}

export const MantraFrequencyContext = createContext(null)
const defaultFrequency = 1 // 1 = rarely, 2 = sometimes, 3 = often, 4 = always
const MantraFrequencyProvider = ({ children }) => {
  const [frequency, setFrequency] = useChromeStorage("frequency", defaultFrequency)
  return (
    <MantraFrequencyContext.Provider value={{ frequency, setFrequency }}>{children}</MantraFrequencyContext.Provider>
  )
}

export const MantrasCurated = createContext(null)
const defaultCurated = false
const MantrasCuratedProvider = ({ children }) => {
  const [curated, setCurated] = useChromeStorage("curated", defaultCurated)
  return <MantrasCurated.Provider value={{ curated, setCurated }}>{children}</MantrasCurated.Provider>
}

export const MantraOptionsContext = createContext(null)
const defaultOptions = [
  "Today, above all else, I choose love.",
  "Everything I need is within me.",
  "Today is my newest masterpiece.",
  "Joy is right here.",
]
const MantraOptionsProvider = ({ children }) => {
  const [options, setOptions] = useChromeStorage("options", defaultOptions)
  return <MantraOptionsContext.Provider value={{ options, setOptions }}>{children}</MantraOptionsContext.Provider>
}

export const GreetingProvider = ({ children }) => {
  return (
    <ShowGreetingProvider>
      <MantraFrequencyProvider>
        <MantraEnabledProvider>
          <MantrasCuratedProvider>
            <CustomGreetingProvider>
              <MantraOptionsProvider>{children}</MantraOptionsProvider>
            </CustomGreetingProvider>
          </MantrasCuratedProvider>
        </MantraEnabledProvider>
      </MantraFrequencyProvider>
    </ShowGreetingProvider>
  )
}
