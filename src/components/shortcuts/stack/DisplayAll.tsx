import fuzzysort from "fuzzysort"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { InfoIcon, LayoutGridIcon, ShovelIcon } from "lucide-react"
import { Fragment, useContext, useState } from "react"
import { Input } from "@/components/ui/input"
import { AllShortcuts } from "./AllShortcutsDialog"
import ImageDisplay from "../ImageDisplay"
import { hasProtocol } from "@/utils/isValidURL"

type Shortcut = {
  name: string
  url: string
  id: string
  useCount: number
}

export default function DisplayAll() {
  const { shortcuts, addOneToUseCount } = useContext(shortcutsContext)
  // max 10 columns, try to make rows have same amount of columns, so 12 items would have two rows of 6 columns, 15 items would have three rows of 5 columns
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
  }
  if (shortcuts.length > 18) {
    return (
      <div className="mt-8 flex gap-2 px-12 md:px-24">
        {shortcuts.slice(0, 17).map((shortcut: Shortcut, i: number) => (
          <Fragment key={shortcut.id}>
            <a
              key={shortcut.id}
              tabIndex={0}
              href={shortcut.url}
              target="_blank"
              onClick={() => addOneToUseCount(shortcut.id)}
              className="group flex h-min min-w-32 basis-1/6 cursor-pointer flex-col items-center gap-1 rounded px-1 py-3 transition-colors duration-75 hover:bg-foreground/10"
            >
              <ImageDisplay className="h-8 w-8 rounded" url={shortcut.url} />
              <span className="line-clamp-2 max-w-20 text-center text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
                {shortcut.name}
              </span>
            </a>
          </Fragment>
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
    <div className="mx-auto mt-4 flex flex-wrap items-start justify-center px-12 md:px-24">
      {shortcuts.map((shortcut: Shortcut, i: number) => (
        <Fragment key={shortcut.id}>
          <a
            key={shortcut.id}
            tabIndex={0}
            href={shortcut.url}
            target="_blank"
            onClick={() => addOneToUseCount(shortcut.id)}
            className="group flex h-min min-w-32 basis-1/6 cursor-pointer flex-col items-center gap-1 rounded px-1 py-3 transition-colors duration-75 hover:bg-foreground/10"
          >
            <ImageDisplay className="h-8 w-8 rounded" url={shortcut.url} />
            <span className="line-clamp-2 max-w-20 text-center text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
              {shortcut.name}
            </span>
          </a>
        </Fragment>
      ))}
    </div>
  )
}
