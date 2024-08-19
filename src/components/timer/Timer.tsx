import { useContext, useEffect, useRef, useState } from "react"
import { TimerEnabledContext } from "../../context/timer/TimerProvider"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AlarmClockCheck, Clock12Icon, Clock5, TriangleAlertIcon } from "lucide-react"
import { TimerRunning } from "./TimerRunning"
import { StopwatchRunning } from "./StopwatchRunning"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
// import TimerRunning from "./TimerRunning"

export default function Timer() {
  const [isOpen, setIsOpen] = useState(false)
  const { timerEnabled } = useContext(TimerEnabledContext)
  const inputHours = useRef<HTMLInputElement | null>(null)
  const inputMins = useRef<HTMLInputElement | null>(null)
  const inputSecs = useRef<HTMLInputElement | null>(null)
  const [timerError, setTimerError] = useState<string | null>(null)
  const [timerState, setTimerState] = useState<"running" | "paused" | "stopped">("stopped")
  const timerPausedTime = useRef<Date | null>(null)
  const timerStartTime = useRef<Date | null>(null)
  const timerEndTime = useRef<Date | null>(null)
  const [stopwatchState, setStopwatchState] = useState<"running" | "paused" | "stopped">("stopped")
  const stopwatchPausedTime = useRef<Date | null>(null)
  const stopwatchStartTime = useRef<Date | null>(null)
  const [hasTimerEndAlert, setHasTimerEndAlert] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("timerData")
    if (data) {
      const parsedData = JSON.parse(data)
      setTimerState(parsedData.timerState)
      timerStartTime.current = new Date(parsedData.timerStartTime)
      timerEndTime.current = new Date(parsedData.timerEndTime)
      if (parsedData.timerState === "paused") {
        timerPausedTime.current = new Date(parsedData.timerPausedTime)
      }
    }
  }, [])

  const handleTimerStart = () => {
    if (inputHours.current && inputMins.current && inputSecs.current) {
      const hours = parseInt(inputHours.current.value) || 0
      const mins = parseInt(inputMins.current.value) || 0
      const secs = parseInt(inputSecs.current.value) || 0
      if (hours + mins + secs === 0) {
        setTimerError("Invalid time")
        return
      }
      const now = new Date()
      timerStartTime.current = now
      timerEndTime.current = new Date(now.getTime() + hours * 3600000 + mins * 60000 + secs * 1000)
      setTimerState("running")
      setTimerError(null)
      localStorage.setItem("lastTimerInput", JSON.stringify({ hours, mins, secs }))
      localStorage.setItem(
        "timerData",
        JSON.stringify({
          timerState: "running",
          timerPausedTime: null,
          timerStartTime: timerStartTime.current,
          timerEndTime: timerEndTime.current,
        }),
      )
    }
  }

  const handleTimerPause = () => {
    timerPausedTime.current = new Date()
    setTimerState("paused")
    setTimerError(null)
    localStorage.setItem(
      "timerData",
      JSON.stringify({
        timerState: "paused",
        timerPausedTime: timerPausedTime.current,
        timerStartTime: timerStartTime.current,
        timerEndTime: timerEndTime.current,
      }),
    )
  }

  const handleTimerUnpause = () => {
    timerEndTime.current = new Date(
      new Date().getTime() + timerEndTime.current.getTime() - timerPausedTime.current.getTime(),
    )
    setTimerState("running")
    setTimerError(null)
    localStorage.setItem(
      "timerData",
      JSON.stringify({
        timerState: "running",
        timerPausedTime: null,
        timerStartTime: timerStartTime.current,
        timerEndTime: timerEndTime.current,
      }),
    )
  }

  const handleTimerEnd = () => {
    timerPausedTime.current = null
    timerEndTime.current = null
    setTimerState("stopped")
    setTimerError(null)
    localStorage.removeItem("timerData")
  }

  const handleStopwatchStart = () => {
    stopwatchStartTime.current = new Date()
    setStopwatchState("running")
  }
  const handleStopwatchPause = () => {
    stopwatchPausedTime.current = new Date()
    setStopwatchState("paused")
  }
  const handleStopwatchUnpause = () => {
    stopwatchStartTime.current = new Date(
      new Date().getTime() + stopwatchStartTime.current.getTime() - stopwatchPausedTime.current.getTime(),
    )
    setStopwatchState("running")
  }
  const handleStopwatchEnd = () => {
    stopwatchPausedTime.current = null
    stopwatchStartTime.current = null
    setStopwatchState("stopped")
  }
  const validateNumber = (input: string, max: number) => {
    // return only numbers if not number return empty string
    const integerNum = parseInt(input.replace(/[^0-9]/g, ""))
    if (integerNum > max) return max.toString()
    return integerNum.toString()
  }

  if (timerEnabled) {
    return (
      <Popover
        onOpenChange={(e) => {
          setIsOpen(e)
          if (hasTimerEndAlert && !e) {
            setHasTimerEndAlert(false)
          }
        }}
      >
        <PopoverTrigger
          className={`group cursor-pointer rounded-lg p-2 transition-colors ${isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"} ${hasTimerEndAlert && "animate-timer-alert"}`}
        >
          {hasTimerEndAlert ? (
            <TriangleAlertIcon className="h-10 w-10 text-amber-500" />
          ) : (
            <Clock12Icon
              className={`h-12 w-12 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
            />
          )}
          {/* <div className={`h-10 w-10 rounded ${hasTimerEndAlert ? "bg-red-500" : "bg-white"}`}></div> */}
        </PopoverTrigger>
        {/* content */}
        {/* <AnimateUnmount
          animationOpen="slideUpExpandFadeIn"
          animationClose="slideDownShrinkFadeOut"
          closeDuration="100ms"
          active={isOpen}
        > */}
        <PopoverContent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          sideOffset={8}
          collisionPadding={16}
          className="p-3"
        >
          {timerState === "stopped" && stopwatchState === "stopped" ? (
            <>
              <h1 className="text-xl font-medium">Timer</h1>
              <span className="flex items-center gap-3">
                <label className="flex-grow">
                  <span className="text-sm font-medium text-muted-foreground">Hours</span>
                  <Input
                    ref={inputHours}
                    onChange={(e) => {
                      e.target.value = validateNumber(e.target.value, 23)
                    }}
                    maxLength={2}
                    type="number"
                    placeholder="00"
                    className="px-2 py-1 text-center font-mono text-lg"
                  />
                </label>

                <label className="flex-grow">
                  <span className="text-sm font-medium text-muted-foreground">Mins</span>
                  <Input
                    ref={inputMins}
                    onChange={(e) => {
                      e.target.value = validateNumber(e.target.value, 59)
                    }}
                    maxLength={2}
                    type="number"
                    placeholder="00"
                    className="px-2 py-1 text-center font-mono text-lg"
                  />
                </label>
                <label className="flex-grow">
                  <span className="text-sm font-medium text-muted-foreground">Secs</span>
                  <Input
                    ref={inputSecs}
                    onChange={(e) => {
                      e.target.value = validateNumber(e.target.value, 59)
                    }}
                    maxLength={2}
                    type="number"
                    placeholder="00"
                    className="px-2 py-1 text-center font-mono text-lg"
                  />
                </label>
              </span>
              <Button onClick={handleTimerStart} variant="secondary" className="mt-2 w-full">
                <AlarmClockCheck className="mr-2 h-6 w-6" />
                Start timer
              </Button>
              {timerError && <p className="mt-2 text-sm text-red-500">{timerError}</p>}
              <Separator className="my-2" />
              <h1 className="mb-2 text-xl font-medium">Stopwatch</h1>
              <Button className="w-full" onClick={handleStopwatchStart} variant="secondary">
                <Clock5 className="mr-2 h-6 w-6" />
                Start stopwatch
              </Button>
            </>
          ) : stopwatchState === "stopped" ? (
            // Timer is running
            // <TimerRunning currentState={timerState} setCurrentState={setTimerState} />
            <div className="flex flex-col">
              <TimerRunning
                pausedTime={timerPausedTime.current?.getTime()}
                timerState={timerState}
                startTime={timerStartTime.current.getTime()}
                finishTimer={() => {
                  handleTimerEnd()
                  setHasTimerEndAlert(true)
                }}
                endTime={timerEndTime.current.getTime()}
              />
              {timerState === "paused" && (
                <Button variant="outline" onClick={handleTimerUnpause}>
                  Unpause timer
                </Button>
              )}
              {timerState === "running" && (
                <Button variant="outline" onClick={handleTimerPause}>
                  Pause timer
                </Button>
              )}
              <Button onClick={handleTimerEnd} variant="secondary" className="mt-2">
                End timer
              </Button>
            </div>
          ) : (
            // Stopwatch is running
            <div className="flex flex-col">
              <StopwatchRunning currentState={stopwatchState} startTime={stopwatchStartTime.current.getTime()} />
              {stopwatchState === "paused" && (
                <Button variant="outline" onClick={handleStopwatchUnpause}>
                  Unpause stopwatch
                </Button>
              )}
              {stopwatchState === "running" && (
                <Button variant="outline" onClick={handleStopwatchPause}>
                  Pause stopwatch
                </Button>
              )}
              <Button onClick={handleStopwatchEnd} variant="secondary" className="mt-2">
                End stopwatch
              </Button>
            </div>
          )}
        </PopoverContent>
        {/* </AnimateUnmount> */}
      </Popover>
    )
  }
}
