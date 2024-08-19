import { useContext } from "react"
import { MantraFrequencyContext } from "../../../../context/general/GreetingContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MantraFrequency() {
  const { frequency, setFrequency } = useContext(MantraFrequencyContext)
  return (
    <label className="grid grid-cols-3 items-center gap-8">
      <span className="col-span-2">
        <h2 className="text-lg">Mantra frequncy</h2>
        <h3 className="text-muted-foreground">How often a mantra will appear in place of a greeting</h3>
      </span>
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
    </label>
  )
}
