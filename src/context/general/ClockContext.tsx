import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const Clock24HourContext = createContext(null)

const defaultUse24Hour = false
const Clock24HourProvider = ({ children }) => {
  const [use24Hour, setUse24Hour] = useChromeStorage("use24Hour", defaultUse24Hour)
  return <Clock24HourContext.Provider value={{ use24Hour, setUse24Hour }}>{children}</Clock24HourContext.Provider>
}

export const ShowSecondsContext = createContext(null)
const defaultShowSeconds = false
const ShowSecondsProvider = ({ children }) => {
  const [showSeconds, setShowSeconds] = useChromeStorage("showSeconds", defaultShowSeconds)
  return <ShowSecondsContext.Provider value={{ showSeconds, setShowSeconds }}>{children}</ShowSecondsContext.Provider>
}

export const ClockProvider = ({ children }) => {
  return (
    <Clock24HourProvider>
      <ShowSecondsProvider>{children}</ShowSecondsProvider>
    </Clock24HourProvider>
  )
}
