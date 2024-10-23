import { showShortcutsContext } from "@/context/shortcuts/Shortcuts"
import Toggle from "../controls/Toggle"
import ViewSelector from "./ViewSelector"
import ShortcutList from "./ShortcutList"

export default function ShortcutSettings() {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <label htmlFor="showShortcuts" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg text-foreground/90">Show shortcuts</h2>
        </span>
        <Toggle htmlFor="showShortcuts" ctx={showShortcutsContext} />
      </label>
      <ViewSelector />
      <ShortcutList />
    </div>
  )
}
