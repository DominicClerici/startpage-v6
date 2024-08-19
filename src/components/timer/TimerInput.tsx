import { useRef } from "react"

export default function TimerInput({ time, setTime }: { time: number; setTime: (time: number) => void }) {
  // time value is in seconds
  const secondsRef = useRef(null)
  const minutesRef = useRef(null)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const validateSeconds = (time: number) => {
    if (isNaN(time)) return 0
    if (time < 0) return 0
    if (time > 59) return 59
    return time
  }
  const validateTime = (time: number) => {
    if (isNaN(time)) return 0
    if (time < 0) return 0
    return time
  }

  const handleUpdateSeconds = () => {
    if (!secondsRef.current) return
    const newSeconds = validateSeconds(parseInt(secondsRef.current.value))
    setTime(minutes * 60 + newSeconds)
    secondsRef.current.value = newSeconds.toString()
  }
  const handleUpdateMinutes = () => {
    if (!minutesRef.current) return
    const newMinutes = validateTime(parseInt(minutesRef.current.value))
    setTime(newMinutes * 60 + seconds)
    minutesRef.current.value = newMinutes.toString()
  }

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          className="w-28 rounded border border-white/30 bg-popup px-2 py-1 text-white/60 focus:text-white"
          type="number"
          min={0}
          ref={minutesRef}
          onBlur={handleUpdateMinutes}
          defaultValue={minutes ? minutes : 0}
        />
        <span className="pointer-events-none absolute right-2 text-white/50">m</span>
      </div>
      <span className="w-2 text-center font-bold text-white/50">:</span>
      <div className="relative flex items-center">
        <input
          className="w-28 rounded border border-white/30 bg-popup px-2 py-1 text-white/60 focus:text-white"
          type="number"
          max={59}
          min={0}
          ref={secondsRef}
          onBlur={handleUpdateSeconds}
          defaultValue={seconds ? seconds : 0}
        />
        <span className="pointer-events-none absolute right-2 text-white/50">s</span>
      </div>
    </div>
  )
}
