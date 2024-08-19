import useChromeStorage from "@/hooks/useChromeStorage"
import { createContext } from "react"

export const displayModeContext = createContext(null)
const displayModeDefault = "shown" // "shown" or "hidden" or "suggested"
const DisplayModeProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useChromeStorage("gridDisplayMode", displayModeDefault)
  return <displayModeContext.Provider value={{ displayMode, setDisplayMode }}>{children}</displayModeContext.Provider>
}

export const shortcutsContext = createContext(null)
const shortcutsDefault = [
  { name: "Portfolio", url: "https://www.dominicclerici.com", id: "10", useCount: 0 },
  { name: "StackOverflow", url: "https://stackoverflow.com", id: "1", useCount: 0 },
  { name: "GitHub", url: "https://github.com", id: "2", useCount: 0 },
  { name: "Google", url: "https://www.google.com", id: "3", useCount: 0 },
  { name: "YouTube", url: "https://www.youtube.com", id: "4", useCount: 0 },
  { name: "Reddit", url: "https://www.reddit.com", id: "5", useCount: 0 },
  { name: "Twitter", url: "https://twitter.com", id: "6", useCount: 0 },
  { name: "LinkedIn", url: "https://www.linkedin.com", id: "7", useCount: 0 },
  { name: "Medium", url: "https://medium.com", id: "8", useCount: 0 },
  { name: "Mozilla Developer Network", url: "https://developer.mozilla.org", id: "9", useCount: 0 },
  { name: "Product Hunt", url: "https://www.producthunt.com", id: "11", useCount: 0 },
  { name: "Dev.to", url: "https://dev.to", id: "12", useCount: 0 },
]

const ShortcutsProvider = ({ children }) => {
  const [shortcuts, setShortcuts] = useChromeStorage("shortcuts", shortcutsDefault)

  const addOneToUseCount = (id) => {
    const newShortcuts = shortcuts.map((shortcut) => {
      if (shortcut.id === id) {
        return { ...shortcut, useCount: shortcut.useCount + 1 }
      }
      return shortcut
    })
    setShortcuts(newShortcuts)
  }

  return (
    <shortcutsContext.Provider value={{ shortcuts, setShortcuts, addOneToUseCount }}>
      {children}
    </shortcutsContext.Provider>
  )
}

export const Shortcuts = ({ children }) => {
  return (
    <DisplayModeProvider>
      <ShortcutsProvider>{children}</ShortcutsProvider>
    </DisplayModeProvider>
  )
}
