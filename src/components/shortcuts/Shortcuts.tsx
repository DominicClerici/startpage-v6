import { displayModeContext } from "@/context/shortcuts/Shortcuts"
import { useContext } from "react"
import DisplayAll from "./stack/DisplayAll"
import Suggested from "./stack/Suggested"

export default function Shortcuts() {
  const { displayMode } = useContext(displayModeContext)
  if (displayMode === "shown") {
    return <DisplayAll />
  } else if (displayMode === "suggested") {
    return <Suggested />
  } else {
    return null
  }
}
