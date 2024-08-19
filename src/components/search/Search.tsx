import { useContext, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import AnimateUnmount from "../lib/AnimateUnmount"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import fuzzysort from "fuzzysort"
import ImageDisplay from "../shortcuts/ImageDisplay"
import { getHistory } from "./getHistory"
import { SearchXIcon } from "lucide-react"
import { Separator } from "../ui/separator"

const GoogleSVG = ({ className }: { className: string }) => {
  return (
    <svg className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  )
}

export default function Search() {
  const { shortcuts, addOneToUseCount } = useContext(shortcutsContext)
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const searchContainerRef = useRef(null)
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  useEffect(() => {
    getHistory().then((history) => {
      historyRef.current = history
    })
  }, [])

  // When click is in ref set is open true, otherwise false:
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (!isOpen) {
          setIsOpen(true)
          inputRef.current.focus()
          e.stopPropagation()
        }
      } else if (e.key === "Escape") {
        setIsOpen(false)
        inputRef.current.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  let shortcutResults = []
  let historyResults = []
  if (searchValue.trim() !== "") {
    shortcutResults = fuzzysort
      .go(searchValue, shortcuts, { limit: 3, keys: ["name", "url"] })
      .map((result) => result.obj)
    historyResults = fuzzysort
      .go(searchValue, historyRef.current, { limit: 3, keys: ["name", "url"] })
      .map((result) => result.obj)
  }

  // use arrow keys to navigate through results using highlighted index state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (highlightedIndex >= shortcutResults.length + historyResults.length + 1) {
        setHighlightedIndex(shortcutResults.length + historyResults.length)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((highlightedIndex + 1) % (shortcutResults.length + historyResults.length + 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        let newVal = (highlightedIndex - 1) % (shortcutResults.length + historyResults.length + 1)
        if (newVal < 0) {
          newVal = newVal + shortcutResults.length + historyResults.length + 1
        }
        setHighlightedIndex(newVal)
      } else if (e.key === "Enter") {
        if (isOpen) {
          if (highlightedIndex === 0) {
            // add 1 to useCount of shortcut
            window.open(`https://www.google.com/search?q=${searchValue}`)
          } else if (highlightedIndex <= shortcutResults.length) {
            const selected = shortcuts.find((shortcut) => shortcut.id === shortcutResults[highlightedIndex - 1].id)
            addOneToUseCount(selected.id)
            window.open(selected.url)
          } else {
            window.open(historyResults[highlightedIndex - shortcutResults.length - 1].url)
          }
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [searchValue, highlightedIndex])

  return (
    <div className="relative z-0 mt-4" ref={searchContainerRef}>
      <Input
        ref={inputRef}
        className={`z-20 w-96 text-lg font-medium ${isOpen ? "rounded-t" : "rounded"}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for anything..."
      />
      <AnimateUnmount active={isOpen && searchValue.trim() !== ""} openDuration="100ms" closeDuration="100ms">
        <div className="absolute left-0 top-0 flex w-96 flex-col rounded-b border-x border-b bg-card p-2">
          <span
            onClick={() => window.open(`https://www.google.com/search?q=${searchValue}`)}
            onMouseEnter={() => setHighlightedIndex(0)}
            className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 ${highlightedIndex === 0 && "bg-foreground/10"}`}
          >
            <GoogleSVG className="h-5 w-5" /> Search with google
          </span>
          <Separator className="my-2" />
          {shortcutResults.length === 0 && historyResults.length === 0 ? (
            <span className="flex items-center gap-2">
              <SearchXIcon className="h-5 w-5" /> No results found
            </span>
          ) : (
            <>
              {shortcutResults.length === 0 ? (
                <span className="flex items-center gap-2">
                  <SearchXIcon className="h-5 w-5" /> No shortcuts found
                </span>
              ) : (
                <>
                  <span className="border-b font-medium text-muted-foreground">Shortcuts</span>
                  {shortcutResults.map((shortcut, i) => (
                    <div
                      onClick={() => window.open(shortcut.url)}
                      onMouseEnter={() => setHighlightedIndex(i + 1)}
                      key={shortcut.id}
                      className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 ${highlightedIndex === i + 1 && "bg-foreground/10"}`}
                    >
                      <ImageDisplay url={shortcut.url} className="h-5 w-5 rounded border" />
                      <span className="line-clamp-1">{shortcut.name}</span>
                    </div>
                  ))}
                </>
              )}
              {historyResults.length === 0 ? (
                <span className="flex items-center gap-2">
                  <SearchXIcon className="h-5 w-5" /> No history found
                </span>
              ) : (
                <>
                  <span className="border-b font-medium text-muted-foreground">History</span>
                  {historyResults.map((history, i) => (
                    <div
                      onClick={() => window.open(history.url)}
                      onMouseEnter={() => setHighlightedIndex(i + shortcutResults.length + 1)}
                      key={`${i}_hist`}
                      className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 ${highlightedIndex === i + shortcutResults.length + 1 && "bg-foreground/10"}`}
                    >
                      <ImageDisplay url={history.url} className="h-5 w-5 rounded border" />
                      <span className="line-clamp-1">{history.name}</span>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </AnimateUnmount>
    </div>
  )
}
