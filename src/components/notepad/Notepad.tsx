import { PencilIcon } from "lucide-react"
import { useState } from "react"
import AnimateUnmount from "../lib/AnimateUnmount"
import Content from "./Content"

export default function Notepad() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="fixed bottom-24 right-4">
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="group cursor-pointer rounded-lg p-1 text-muted-foreground transition-colors duration-75 hover:bg-foreground/10"
        >
          <PencilIcon className="h-12 w-12" />
        </button>
        {/* content */}
        <AnimateUnmount
          animationOpen="slideDownExpandFadeIn"
          animationClose="slideUpShrinkFadeOut"
          closeDuration="100ms"
          active={isOpen}
        >
          <div className="absolute bottom-20 right-0 rounded-lg border bg-card p-3">
            <Content />
          </div>
        </AnimateUnmount>
      </div>
    </div>
  )
}
