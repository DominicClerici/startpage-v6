import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClockSizeContext } from "@/context/general/ClockContext"
import { useContext } from "react"

export default function ClockSize() {
  const { clockSize, setClockSize } = useContext(ClockSizeContext)
  return (
    <label htmlFor="showClock" className="grid grid-cols-3 items-center">
      <span className="col-span-2">
        <h2 className="text-lg">Clock size</h2>
      </span>
      <div className="">
        <Select value={clockSize} onValueChange={setClockSize}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra small</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Regular</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </label>
  )
}
