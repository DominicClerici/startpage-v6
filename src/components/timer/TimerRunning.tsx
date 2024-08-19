import { useEffect, useState } from "react"

export const TimerRunning = ({
  endTime,
  startTime,
  finishTimer,
  pausedTime,
  timerState,
}: {
  startTime: number
  endTime: number
  pausedTime: number
  timerState: "running" | "paused" | "stopped"
  finishTimer: () => void
}) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)
  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTime = new Date()
      const diff = endTime - currentTime.getTime()
      // format time left as hours, mins, secs (1:23:45) or (23:45) or (0:45)
      const hours = Math.floor(diff / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)
      if (diff <= 0) {
        finishTimer()
        return
      }
      if (timerState === "paused") {
        const diff = endTime - pausedTime
        const hours = Math.floor(diff / 3600000)
        const mins = Math.floor((diff % 3600000) / 60000)
        const secs = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${hours}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`)
        return
      }
      setTimeLeft(`${hours}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`)
    }
    updateTimeLeft()
    let interval: null | NodeJS.Timeout = null
    if (timerState === "running") {
      interval = setInterval(updateTimeLeft, 1000)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerState])
  const currentTime = new Date().getTime() + 1000
  return (
    <div className={`mb-8 flex min-w-60 flex-col transition-opacity ${timerState === "paused" && "opacity-50"}`}>
      <h2 className="my-4 text-center text-2xl font-bold">{timeLeft}</h2>
      <div className="h-4 w-full rounded-full bg-secondary p-1">
        <div
          style={{
            width: `${Math.max(((currentTime - startTime) / (endTime - startTime)) * 100, 4)}%`,
          }}
          className="h-2 rounded-full bg-primary transition-[width] duration-300"
        ></div>
      </div>
    </div>
  )
}
