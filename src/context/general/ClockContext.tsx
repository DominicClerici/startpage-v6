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

export const DisplayClockContext = createContext(null)
const defaultDisplayClock = true
const DisplayClockProvider = ({ children }) => {
  const [displayClock, setDisplayClock] = useChromeStorage("displayClock", defaultDisplayClock)
  return (
    <DisplayClockContext.Provider value={{ displayClock, setDisplayClock }}>{children}</DisplayClockContext.Provider>
  )
}

export const ClockSizeContext = createContext(null)
const defaultClockSize = "md"
const ClockSizeProvider = ({ children }) => {
  const [clockSize, setClockSize] = useChromeStorage("clockSize", defaultClockSize)
  return <ClockSizeContext.Provider value={{ clockSize, setClockSize }}>{children}</ClockSizeContext.Provider>
}

export const ClockProvider = ({ children }) => {
  return (
    <Clock24HourProvider>
      <DisplayClockProvider>
        <ClockSizeProvider>
          <ShowSecondsProvider>{children}</ShowSecondsProvider>
        </ClockSizeProvider>
      </DisplayClockProvider>
    </Clock24HourProvider>
  )
}
