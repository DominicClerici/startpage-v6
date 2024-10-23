import {
  CustomGreetingContext,
  MantraEnabledContext,
  MantraFrequencyContext,
  ShowGreetingContext,
} from "@/context/general/GreetingContext"
import Toggle from "../controls/Toggle"
import { useContext, useState } from "react"
import { FirstNameContext } from "@/context/general/UserInfoContext"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleHelp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MantrasUsed from "./MantrasUsed"

export default function GreetingSettings() {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <label htmlFor="showGreeting" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-foreground/90">Show greeting</h2>
        </span>
        <Toggle htmlFor="showGreeting" ctx={ShowGreetingContext} />
      </label>
      <label htmlFor="firstName" className="grid grid-cols-3 items-center">
        <span className="col-span-2">
          <h2 className="text-lg text-foreground/90">Nickname</h2>
        </span>
        <Name />
      </label>
      <label htmlFor="customGreeting" className="grid grid-cols-3 items-center">
        <span className="col-span-2">
          <h2 className="flex items-center gap-1 text-lg text-foreground/90">
            Custom greeting
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </TooltipTrigger>
              <TooltipContent>Leave input blank to use no greeting</TooltipContent>
            </Tooltip>
          </h2>
        </span>
        <CustomGreeting />
      </label>
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <span>
          <h2 className="flex items-center gap-1 text-lg text-foreground/90">
            Show mantras
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </TooltipTrigger>
              <TooltipContent>Show a mantra instead of a greeting</TooltipContent>
            </Tooltip>
          </h2>
        </span>
        <Toggle htmlFor="clockFormat" ctx={MantraEnabledContext} />
      </label>
      <label className="grid grid-cols-3 items-center">
        <span className="col-span-2">
          <h2 className="flex items-center gap-1 text-lg text-foreground/90">
            Mantra frequncy
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </TooltipTrigger>
              <TooltipContent>How often a mantra will appear in place of a greeting</TooltipContent>
            </Tooltip>
          </h2>
        </span>
        <MantraFrequency />
      </label>
      <MantrasUsed />
    </div>
  )
}

const Name = () => {
  const { firstName, setFirstName } = useContext(FirstNameContext)
  const [currentName, setCurrentName] = useState(firstName)

  return (
    <Input
      id="firstName"
      placeholder="John Doe"
      value={currentName || ""}
      onChange={(e) => setCurrentName(e.target.value)}
      onBlur={() => setFirstName(currentName)}
    />
  )
}

const CustomGreeting = () => {
  const { customGreeting, setCustomGreeting } = useContext(CustomGreetingContext)
  const [currentGreeting, setCurrentGreeting] = useState(customGreeting)

  return (
    <Input
      id="customGreeting"
      placeholder="None"
      value={currentGreeting}
      onChange={(e) => setCurrentGreeting(e.target.value)}
      onBlur={() => setCustomGreeting(currentGreeting)}
    />
  )
}

const MantraFrequency = () => {
  const { frequency, setFrequency } = useContext(MantraFrequencyContext)
  return (
    <Select value={frequency.toString()} onValueChange={setFrequency}>
      <SelectTrigger>
        <SelectValue placeholder="Select a frequency..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Never</SelectItem>
        <SelectItem value="1">Rarely</SelectItem>
        <SelectItem value="2">Sometimes</SelectItem>
        <SelectItem value="3">Often</SelectItem>
        <SelectItem value="4">Always</SelectItem>
      </SelectContent>
    </Select>
  )
}
