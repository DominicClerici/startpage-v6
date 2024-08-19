import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

type LayoutContextType = {
  layout: number
  setLayout: (layout: number) => void
}

const DEFAULT_layout = 0
export const LayoutContext = createContext<LayoutContextType | null>(null)

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useChromeStorage("layout", DEFAULT_layout)
  return <LayoutContext.Provider value={{ layout, setLayout }}>{children}</LayoutContext.Provider>
}
