import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import fuzzysort from "fuzzysort"
import { useContext, useState } from "react"
import ImageDisplay from "../ImageDisplay"

type Shortcut = {
  name: string
  url: string
  id: string
}

export const AllShortcuts = () => {
  const { shortcuts, addOneToUseCount } = useContext(shortcutsContext)
  const [filterInput, setFilterInput] = useState("")

  let results
  if (filterInput.trim() !== "") {
    results = fuzzysort.go(filterInput, shortcuts, { keys: ["name", "url"] }).map((result) => result.obj)
  } else {
    results = shortcuts
  }

  return (
    <DialogContent className="max-w-screen-md">
      <DialogHeader className="flex flex-row items-start justify-center">
        <DialogTitle className="absolute left-7 text-2xl">All shortcuts</DialogTitle>
        <Input
          placeholder="Filter shortcuts..."
          className="max-w-64 flex-grow-0"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </DialogHeader>
      <div className="grid grid-cols-6 gap-4">
        {results.map((shortcut: Shortcut) => (
          <a
            tabIndex={0}
            href={shortcut.url}
            target="_blank"
            onClick={() => addOneToUseCount(shortcut.id)}
            className="group flex cursor-pointer flex-col items-center gap-1 rounded p-1 transition-colors duration-75 hover:bg-foreground/10"
          >
            <ImageDisplay className="h-8 w-8 rounded" url={shortcut.url} />
            <span className="line-clamp-2 max-w-20 text-center text-sm text-muted-foreground transition-colors duration-75 group-hover:text-foreground">
              {shortcut.name}
            </span>
          </a>
        ))}
      </div>
    </DialogContent>
  )
}
