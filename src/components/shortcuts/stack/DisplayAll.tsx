import fuzzysort from "fuzzysort"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { LayoutGridIcon } from "lucide-react"
import { useContext, useState } from "react"
import { Input } from "@/components/ui/input"
import { AllShortcuts } from "./AllShortcutsDialog"
import ImageDisplay from "../ImageDisplay"

type Shortcut = {
  name: string
  url: string
  id: string
  useCount: number
}

export default function DisplayAll() {
  const { shortcuts, addOneToUseCount } = useContext(shortcutsContext)
  // max 10 columns, try to make rows have same amount of columns, so 12 items would have two rows of 6 columns, 15 items would have three rows of 5 columns
  if (shortcuts.length > 18) {
    return (
      <div className="mt-8 grid grid-cols-6 grid-rows-3 gap-2">
        {shortcuts.slice(0, 17).map((shortcut: Shortcut) => (
          <a
            key={shortcut.id}
            tabIndex={0}
            href={shortcut.url}
            target="_blank"
            className="group flex h-min cursor-pointer flex-col items-center gap-1 rounded p-1 transition-colors duration-75 hover:bg-foreground/10"
          >
            <ImageDisplay className="h-8 w-8 rounded" url={shortcut.url} />
            <span className="line-clamp-2 max-w-20 text-center text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
              {shortcut.name}
            </span>
          </a>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <div
              tabIndex={0}
              className="group flex h-min cursor-pointer flex-col items-center gap-1 rounded p-1 transition-colors duration-75 hover:bg-foreground/10"
            >
              <LayoutGridIcon className="h-8 w-8" />
              <span className="text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
                View all
              </span>
            </div>
          </DialogTrigger>
          <AllShortcuts />
        </Dialog>
      </div>
    )
  }
  return (
    <div className="mt-4 grid grid-cols-6 grid-rows-3 gap-2">
      {shortcuts.map((shortcut: Shortcut) => (
        <a
          key={shortcut.id}
          tabIndex={0}
          href={shortcut.url}
          target="_blank"
          onClick={() => addOneToUseCount(shortcut.id)}
          className="group flex h-min cursor-pointer flex-col items-center gap-1 rounded p-1 transition-colors duration-75 hover:bg-foreground/10"
        >
          <ImageDisplay className="h-8 w-8 rounded" url={shortcut.url} />
          <span className="line-clamp-2 max-w-20 text-center text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
            {shortcut.name}
          </span>
        </a>
      ))}
    </div>
  )
}
