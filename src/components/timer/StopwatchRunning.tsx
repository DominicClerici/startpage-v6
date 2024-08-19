import { useState, useEffect } from "react"

export const StopwatchRunning = ({ startTime, currentState }: { startTime: number; currentState: string }) => {
  const [timeElapsed, setTimeElapsed] = useState<string | null>(null)
  useEffect(() => {
    const updateTimeElapsed = () => {
      if (currentState === "stopped") return
      if (currentState === "paused") return
      const currentTime = new Date()
      const diff = currentTime.getTime() - startTime
      const hours = Math.floor(diff / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)
      setTimeElapsed(`${hours}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`)
    }
    updateTimeElapsed()
    const interval = setInterval(updateTimeElapsed, 1000)
    return () => clearInterval(interval)
  }, [currentState])
  return (
    <div className={`flex min-w-60 flex-col transition-opacity ${currentState === "paused" && "opacity-50"}`}>
      <h2 className="my-4 text-center text-2xl font-bold">{timeElapsed}</h2>
    </div>
  )
}
