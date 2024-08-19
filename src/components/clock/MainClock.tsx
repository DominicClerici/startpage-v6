import { useContext, useEffect, useState } from "react"
import { Clock24HourContext, ShowSecondsContext } from "../../context/general/ClockContext"
import Loading from "../lib/Loading"

const MainClock = () => {
  const { use24Hour } = useContext(Clock24HourContext)
  const { showSeconds } = useContext(ShowSecondsContext)
  const [time, setTime] = useState(null)
  // for colon that blinks with seconds in clock
  const [active, setActive] = useState(false)
  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date()
      let rawHours = currentTime.getHours()
      if (use24Hour === false) {
        rawHours = rawHours % 12
      }
      const rawMinutes = currentTime.getMinutes()
      const rawSeconds = currentTime.getSeconds()
      setTime({
        hours: String(rawHours ? rawHours : 12),
        minutes: rawMinutes < 10 ? `0${rawMinutes}` : String(rawMinutes),
        seconds: rawSeconds < 10 ? `0${rawSeconds}` : String(rawSeconds),
        ampm: use24Hour === false ? currentTime.toLocaleTimeString("en-US", { hour12: true }).slice(-2) : "",
      })
    }
    updateClock()
    const interval = setInterval(() => {
      setActive((prev) => !prev)
      updateClock()
    }, 1000)
    return () => clearInterval(interval)
  }, [use24Hour, showSeconds])

  if (time) {
    return (
      <h1 className="select-none text-[90px] font-semibold leading-none text-foreground">
        {time?.hours}
        <span className={`transition-opacity ${active ? "" : "opacity-25"}`}>:</span>
        {time?.minutes}
        {showSeconds && (
          <>
            <span className={`transition-opacity ${active ? "" : "opacity-25"}`}>:</span>
            {time?.seconds}
          </>
        )}
        <span className="text-xl font-light text-muted-foreground">{time?.ampm}</span>
      </h1>
    )
  } else {
    return <></>
  }
}

export default MainClock
