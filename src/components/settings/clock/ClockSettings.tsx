import { Clock24HourContext, DisplayClockContext, ShowSecondsContext } from "@/context/general/ClockContext"
import Toggle from "../controls/Toggle"
import ClockSize from "./ClockSize"

export default function ClockSettings() {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <label htmlFor="showClock" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show clock</h2>
        </span>
        <Toggle htmlFor="showClock" ctx={DisplayClockContext} />
      </label>
      <ClockSize />
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Military time</h2>
        </span>
        <Toggle htmlFor="clockFormat" ctx={Clock24HourContext} />
      </label>
      <label htmlFor="showSeconds" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show seconds</h2>
        </span>
        <Toggle htmlFor="showSeconds" ctx={ShowSecondsContext} />
      </label>
    </div>
  )
}
