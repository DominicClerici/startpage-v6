import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { InfoIcon, LayoutGridIcon } from "lucide-react"
import { useContext } from "react"
import { AllShortcuts } from "./AllShortcutsDialog"
import ImageDisplay from "../ImageDisplay"

type Shortcut = {
  name: string
  url: string
  id: string
  useCount: number
}

export default function Suggested() {
  const { shortcuts, addOneToUseCount } = useContext(shortcutsContext)

  if (shortcuts.length === 0) {
    return (
      <div className="mt-8 flex items-center gap-2 rounded-lg border px-5 py-3.5">
        <InfoIcon className="h-8 w-8" />
        <div className="flex flex-col">
          <h1>No shortcuts</h1>
          <p>Add some shortcuts in settings or disable the shortcuts view</p>
        </div>
      </div>
    )
  } else {
    const topUsed = shortcuts.sort((a: Shortcut, b: Shortcut) => b.useCount - a.useCount).slice(0, 5)
    return (
      <div className="mt-4 flex items-center rounded-lg border bg-card p-2">
        <div className="flex gap-1 rounded-md">
          {topUsed.map((shortcut: Shortcut) => (
            <TooltipProvider delayDuration={150} key={shortcut.id}>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    tabIndex={0}
                    target="_blank"
                    onClick={() => addOneToUseCount(shortcut.id)}
                    href={shortcut.url}
                    className="group flex cursor-pointer flex-col items-center gap-1 rounded p-1 transition-colors duration-75 hover:bg-foreground/10"
                  >
                    <ImageDisplay className="h-6 w-6 rounded" url={shortcut.url} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>{shortcut.name}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        {shortcuts.length > 5 && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="ml-3 mr-1 cursor-pointer">
                <LayoutGridIcon className="h-8 w-8 rounded p-1 transition-colors duration-75 hover:bg-foreground/10" />
              </div>
            </DialogTrigger>
            <AllShortcuts />
          </Dialog>
        )}
      </div>
    )
  }
}
