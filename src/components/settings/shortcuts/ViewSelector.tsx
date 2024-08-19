import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { displayModeContext } from "@/context/shortcuts/Shortcuts"
import { LayoutGridIcon, LightbulbIcon, XCircle } from "lucide-react"
import { useContext } from "react"

export default function ViewSelector() {
  const { displayMode, setDisplayMode } = useContext(displayModeContext)
  return (
    <div className="mt-2 flex items-center justify-between">
      <h2 className="text-lg font-medium text-primary">Display mode</h2>
      <Select value={displayMode} onValueChange={setDisplayMode}>
        <SelectTrigger className="max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="shown">
            <span className="flex items-center gap-2">
              <LayoutGridIcon className="h-4 w-4" /> Grid
            </span>
          </SelectItem>
          <SelectItem value="suggested">
            <span className="flex items-center gap-2">
              <LightbulbIcon className="h-4 w-4" />
              Suggested
            </span>
          </SelectItem>
          <SelectItem value="hidden">
            <span className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Hidden
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
