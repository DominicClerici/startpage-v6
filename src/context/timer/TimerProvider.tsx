import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const TimerEnabledContext = createContext(null)
const timerEnabledDefault = true
const TimerEnabledProvider = ({ children }) => {
  const [timerEnabled, setTimerEnabled] = useChromeStorage("timerEnabled", timerEnabledDefault)
  return (
    <TimerEnabledContext.Provider value={{ timerEnabled, setTimerEnabled }}>{children}</TimerEnabledContext.Provider>
  )
}

export default function TimerProvider({ children }) {
  return <TimerEnabledProvider>{children}</TimerEnabledProvider>
}
