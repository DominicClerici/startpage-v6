import { solidBackgroundColors } from "@/components/background/variants/Solid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SolidBackgroundColorContext } from "@/context/appearance/BackgroundSettings"
import { useContext } from "react"

const ColorSwatch = ({ color, className = "" }) => {
  return <div style={{ backgroundColor: `rgb(${color.bg.rgb})` }} className={`${className} h-4 w-4 rounded-full`}></div>
}

export default function SolidSettings() {
  const { solidBackgroundColor, setSolidBackgroundColor } = useContext(SolidBackgroundColorContext)
  return (
    <div className="mb-4 flex flex-col gap-4">
      <label htmlFor="auraColor" className="grid grid-cols-3 items-center gap-8">
        <span className="col-span-2">
          <h2 className="text-lg">Color</h2>
        </span>
        <Select
          value={solidBackgroundColor.toString()}
          onValueChange={(value) => setSolidBackgroundColor(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[0]} />
                Red
              </span>
            </SelectItem>
            <SelectItem value="1">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[1]} />
                Orange
              </span>
            </SelectItem>
            <SelectItem value="2">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[2]} />
                Yellow
              </span>
            </SelectItem>
            <SelectItem value="3">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[3]} />
                Green
              </span>
            </SelectItem>
            <SelectItem value="4">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[4]} />
                Blue
              </span>
            </SelectItem>
            <SelectItem value="5">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[5]} />
                Indigo
              </span>
            </SelectItem>
            <SelectItem value="6">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[6]} />
                Purple
              </span>
            </SelectItem>
            <SelectItem value="7">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[7]} />
                Pink
              </span>
            </SelectItem>
            <SelectItem value="8">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[8]} />
                Mono
              </span>
            </SelectItem>
            <SelectItem value="9">
              <span className="flex items-center gap-2">
                <ColorSwatch color={solidBackgroundColors[9]} />
                Mono+
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}
