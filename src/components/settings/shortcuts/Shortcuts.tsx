import ShortcutEditor from "./ShortcutEditor"
import ViewSelector from "./ViewSelector"

export default function Shortcuts() {
  return (
    <div className="flex flex-col gap-4">
      <ViewSelector />
      <ShortcutEditor />
    </div>
  )
}
