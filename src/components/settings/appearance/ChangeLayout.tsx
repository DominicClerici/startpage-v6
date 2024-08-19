import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutContext } from "@/context/appearance/Layout"
import { GridIcon, MenuIcon } from "lucide-react"
import { useContext } from "react"

export default function ChangeLayout() {
  const { layout, setLayout } = useContext(LayoutContext)
  return (
    <label htmlFor="auraColor" className="grid grid-cols-3 items-center gap-8">
      <span className="col-span-2">
        <h2 className="text-lg">Color</h2>
      </span>
      <Select value={layout.toString()} onValueChange={(value) => setLayout(parseInt(value))}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">
            <span className="flex items-center gap-2">
              <MenuIcon className="h-4 w-4" />
              Stack
            </span>
          </SelectItem>
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <GridIcon className="h-4 w-4" />
              Classic
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </label>
  )
}
