import { useContext } from "react"
import { MantraEnabledContext } from "../../../../context/general/GreetingContext"
import Toggle from "../../controls/Toggle"
import MantraFrequency from "./MantraFrequency"
import MantrasUsed from "./MantrasUsed"

export default function MantraSettings() {
  const { mantraEnabled } = useContext(MantraEnabledContext)
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-white/90">Show mantras</h2>
          <h3 className="text-white/60">Show a mantra instead of a greeting</h3>
        </span>
        <Toggle htmlFor="clockFormat" ctx={MantraEnabledContext} />
      </label>
      <div className={`flex flex-col gap-4 transition-opacity ${!mantraEnabled && "pointer-events-none opacity-30"}`}>
        <MantraFrequency />
        <MantrasUsed />
      </div>
    </div>
  )
}
