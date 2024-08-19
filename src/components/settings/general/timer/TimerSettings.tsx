import { TimerEnabledContext } from "../../../../context/timer/TimerProvider"
import Toggle from "../../controls/Toggle"

export default function TimerSettings() {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="showTodos" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-white/90">Show timer</h2>
        </span>
        <Toggle htmlFor="showTodos" ctx={TimerEnabledContext} />
      </label>
    </div>
  )
}
