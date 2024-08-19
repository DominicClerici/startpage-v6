import "./styles.css"
import Toggle from "../controls/Toggle"
import { Clock24HourContext, ShowSecondsContext } from "../../../context/general/ClockContext"
import MantraSettings from "./mantras/MantraSettings"
import Greeting from "./greeting/Greeting"
import TodoSettings from "./todo/TodoSettings"
import WeatherSettings from "./weather/WeatherSettings"
import TimerSettings from "./timer/TimerSettings"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function General() {
  return (
    <Accordion type="multiple">
      <AccordionItem value="clock">
        <AccordionTrigger>Clock</AccordionTrigger>
        <AccordionContent className="px-1">
          <div className="flex flex-col gap-4">
            <label htmlFor="clockFormat" className="flex items-center justify-between">
              <span>
                <h2 className="text-lg">Military time</h2>
                <h3 className="text-muted-foreground">Use 24 hour format</h3>
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="greeting">
        <AccordionTrigger>Greeting</AccordionTrigger>
        <AccordionContent className="px-1">
          <Greeting />
          <MantraSettings />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="todos">
        <AccordionTrigger>Todos</AccordionTrigger>
        <AccordionContent className="px-1">
          <TodoSettings />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="weather">
        <AccordionTrigger>Weather</AccordionTrigger>
        <AccordionContent className="px-1">
          <WeatherSettings />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="timer">
        <AccordionTrigger>Timer</AccordionTrigger>
        <AccordionContent className="px-1">
          <TimerSettings />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
