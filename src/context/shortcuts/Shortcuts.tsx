import useChromeStorage from "@/hooks/useChromeStorage"
import { createContext } from "react"

export const showShortcutsContext = createContext(null)
const showShortcutsDefault = true
const ShowShortcutsProvider = ({ children }) => {
  const [showShortcuts, setShowShortcuts] = useChromeStorage("showShortcuts", showShortcutsDefault)
  return (
    <showShortcutsContext.Provider value={{ showShortcuts, setShowShortcuts }}>
      {children}
    </showShortcutsContext.Provider>
  )
}

type ShortcutDisplayModes = "shown" | "suggested"

interface DisplayModeContextType {
  displayMode: ShortcutDisplayModes
  setDisplayMode: (mode: ShortcutDisplayModes) => void
}
export const displayModeContext = createContext<DisplayModeContextType | null>(null)
const displayModeDefault = "shown" as ShortcutDisplayModes
const DisplayModeProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useChromeStorage("gridDisplayMode", displayModeDefault)
  return <displayModeContext.Provider value={{ displayMode, setDisplayMode }}>{children}</displayModeContext.Provider>
}

export interface ShortcutType {
  type: "shortcut" | "folder"
  name: string
  customIcon: boolean
  icon: string | null
  url?: string
  id: string
  useCount: number
  color: string
  order: number
  items?: ShortcutType[]
}

interface ShortcutsContextType {
  shortcuts: ShortcutType[]
  setShortcuts: React.Dispatch<React.SetStateAction<ShortcutType[]>>
  addOneToUseCount: (id: string) => void
}

export const shortcutsContext = createContext<ShortcutsContextType | null>(null)
const shortcutsDefault: ShortcutType[] = [
  {
    type: "shortcut",
    name: "Portfolio",
    url: "https://www.dominicclerici.com",
    id: "10",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "StackOverflow",
    url: "https://stackoverflow.com",
    id: "1",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "GitHub",
    url: "https://github.com",
    id: "2",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "Google",
    url: "https://www.google.com",
    id: "3",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "YouTube",
    url: "https://www.youtube.com",
    id: "4",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "Reddit",
    url: "https://www.reddit.com",
    id: "5",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "Twitter",
    url: "https://twitter.com",
    id: "6",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    id: "7",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
    color: "red",
  },
  {
    type: "shortcut",
    name: "Medium",
    url: "https://medium.com",
    id: "8",
    useCount: 0,
    customIcon: false,
    color: "red",
    icon: "link",
    order: 0,
  },
  {
    type: "shortcut",
    name: "Mozilla Developer Network",
    url: "https://developer.mozilla.org",
    id: "9",
    color: "red",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
  },
  {
    type: "shortcut",
    name: "Product Hunt",
    color: "red",
    url: "https://www.producthunt.com",
    id: "11",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
  },
  {
    type: "shortcut",
    name: "Dev.to",
    url: "https://dev.to",
    id: "12",
    color: "red",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
  },
  {
    type: "shortcut",
    name: "Dev.to",
    color: "red",
    url: "https://dev.to",
    id: "13",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
  },
  {
    type: "shortcut",
    name: "Dev.to",
    color: "red",
    url: "https://dev.to",
    id: "14",
    useCount: 0,
    customIcon: false,
    icon: "link",
    order: 0,
  },
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
      <ShowShortcutsProvider>
        <ShortcutsProvider>{children}</ShortcutsProvider>
      </ShowShortcutsProvider>
    </DisplayModeProvider>
  )
}
