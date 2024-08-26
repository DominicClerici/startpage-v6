import * as Tabs from "@radix-ui/react-tabs"
import { useEffect, useRef, useState } from "react"
import Appearance from "./appearance/Appearance"
import General from "./general/General"
import { Separator } from "@/components/ui/separator"
import Shortcuts from "./shortcuts/Shortcuts"
import Integrations from "./integrations/Integrations"

const className = {
  tab: "flex-1 px-3 py-1 m-1 z-10 text-lg data-[state='active']:pointer-events-none text-muted-foreground transition-colors duration-75 rounded hover:bg-secondary/50 cursor-pointer text-center data-[state='active']:text-foreground",
}

export default function NavigationControl() {
  const [currentTab, setCurrentTab] = useState("gen")
  const [isSwitchingLeft, setIsSwitchingLeft] = useState(false)
  const tabSlider = useRef(null)
  const handleTabChange = (e) => {
    setCurrentTab((prev) => {
      const newIndex = ["gen", "app", "sho", "int"].indexOf(e)
      const prevIndex = ["gen", "app", "sho", "int"].indexOf(prev)
      if (prevIndex < newIndex) {
        setIsSwitchingLeft(true)
      } else {
        setIsSwitchingLeft(false)
      }
      return e
    })
  }

  useEffect(() => {
    const current = document.querySelector(".selectableTab[data-state='active']") as HTMLDivElement
    if (!current) return
    tabSlider.current.style.width = current.offsetWidth + "px"
    tabSlider.current.style.height = current.offsetHeight + "px"
    tabSlider.current.style.transform = `translateX(${current.offsetLeft}px)`
  }, [currentTab])
  return (
    <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
      <Tabs.List className="sticky left-0 top-0 z-30 -mx-6 -mt-8 bg-card px-6 pt-4">
        <div className="relative mt-4 flex items-center gap-1 rounded">
          <Tabs.Trigger value="gen" className={`selectableTab ${className.tab}`}>
            General
          </Tabs.Trigger>
          <Tabs.Trigger value="app" className={`selectableTab ${className.tab}`}>
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger value="sho" className={`selectableTab ${className.tab}`}>
            Shortcuts
          </Tabs.Trigger>
          <Tabs.Trigger value="int" className={`selectableTab ${className.tab}`}>
            Integrations
          </Tabs.Trigger>
          <div
            ref={tabSlider}
            className="absolute rounded bg-secondary brightness-[175%] transition-all duration-200"
          ></div>
        </div>
      </Tabs.List>
      <Separator className="my-2" />
      <div className="relative">
        <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="gen">
          <General />
        </Tabs.Content>
        <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="app">
          <Appearance />
        </Tabs.Content>
        <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="sho">
          <Shortcuts />
        </Tabs.Content>
        <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="int">
          <Integrations />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
