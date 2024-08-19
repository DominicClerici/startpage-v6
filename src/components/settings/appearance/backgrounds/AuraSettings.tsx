import Toggle from "@/components/settings/controls/Toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuraColorContext, FollowMouseContext } from "@/context/appearance/BackgroundSettings"
import { useContext } from "react"

export default function AuraSettings() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <label htmlFor="followMouse" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Follow cursor</h2>
        </span>
        <Toggle htmlFor="followMouse" ctx={FollowMouseContext} />
      </label>
      <label htmlFor="auraColor" className="grid grid-cols-3 items-center gap-8">
        <span className="col-span-2">
          <h2 className="text-lg">Color</h2>
        </span>
        <ColorSelector />
      </label>
    </div>
  )
}

const ColorSwatch = ({ color1, color2, className = "" }) => {
  return (
    <div
      style={{ backgroundImage: `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)` }}
      className={`${className} h-4 w-4 rounded-full`}
    ></div>
  )
}

const ColorSelector = () => {
  const { auraColor, setAuraColor } = useContext(AuraColorContext)
  return (
    <Select value={auraColor.toString()} onValueChange={(value) => setAuraColor(parseInt(value))}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"#0c313c"} color2={"#301c3b"} />
            Standard
          </span>
        </SelectItem>
        <SelectItem value="1">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"#d53369"} color2={"#daae51"} />
            Mimosa
          </span>
        </SelectItem>
        <SelectItem value="2">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"#3F2B96"} color2={"#A8C0FF"} />
            Shady Lane
          </span>
        </SelectItem>
        <SelectItem value="3">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"#FDBB2D"} color2={"#22C1C3"} />
            Retro
          </span>
        </SelectItem>
        <SelectItem value="4">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"#FC466B"} color2={"#3F5EFB"} />
            Disco
          </span>
        </SelectItem>
        <SelectItem value="5">
          <span className="flex items-center gap-2">
            <ColorSwatch color1={"rgb(20,20,20)"} color2={"rgb(60,60,60)"} />
            Mono
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
