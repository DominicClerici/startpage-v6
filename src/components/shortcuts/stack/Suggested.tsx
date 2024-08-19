import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { LayoutGridIcon } from "lucide-react"
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
  const topUsed = shortcuts.sort((a: Shortcut, b: Shortcut) => b.useCount - a.useCount).slice(0, 5)
  return (
    <div className="mt-4 flex items-center rounded-lg border bg-card p-2">
      <div className="grid grid-cols-5 gap-1 rounded-md">
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
      <Dialog>
        <DialogTrigger asChild>
          <div className="ml-3 mr-1 cursor-pointer">
            <LayoutGridIcon className="h-8 w-8 rounded p-1 transition-colors duration-75 hover:bg-foreground/10" />
          </div>
        </DialogTrigger>
        <AllShortcuts />
      </Dialog>
    </div>
  )
}
