import { useContext, useState } from "react"
import Opener from "./components/settings/Opener"
import { LayoutContext } from "./context/appearance/Layout"
import MainClock from "./components/clock/MainClock"
import Greeting from "./components/greeting/Greeting"
import Search from "./components/search/Search"
import Shortcuts from "./components/shortcuts/Shortcuts"
import { LifxMain } from "./components/lifx/Lifx"
import ConnectionWrapper from "./ConnectionWrapper"
import Todos from "./components/todos/Todos"
import Weather from "./components/weather/Weather"
import Timer from "./components/timer/Timer"
import SpotifyAuthController from "./components/spotify/SpotifyAuthController"

export default function LayoutController() {
  const { layout } = useContext(LayoutContext)
  const [prevlayout, setPrevLayout] = useState(layout)
  let usingLayout = 0
  const diff = prevlayout !== layout
  if (diff) {
    usingLayout = prevlayout
    setTimeout(() => {
      setPrevLayout(layout)
    }, 600)
  } else {
    usingLayout = layout
  }
  // stack layout
  if (usingLayout === 0) {
    return (
      <>
        <Opener />
        <div
          className={`${diff ? "opacity-0" : ""} mx-auto flex h-screen max-w-screen-lg flex-col items-center justify-center transition-opacity duration-500`}
        >
          <div className="fixed bottom-4 left-4 flex w-full items-center justify-center">
            <Timer />
            <ConnectionWrapper fallback={<p>Offline</p>}>
              <LifxMain />
            </ConnectionWrapper>
            <Todos />
            <ConnectionWrapper fallback={<p>Offline</p>}>
              <SpotifyAuthController />
            </ConnectionWrapper>
            <ConnectionWrapper fallback={<p>Offline</p>}>
              <Weather />
            </ConnectionWrapper>
          </div>
          <MainClock />
          <Greeting />
          <Search />
          <Shortcuts />
        </div>
      </>
    )
  }
  // some kinda idk layout
  if (usingLayout === 1) {
    return (
      <>
        <Opener />
        <div
          className={`${diff ? "opacity-0" : ""} mx-auto flex h-screen max-w-screen-lg flex-col items-center justify-center transition-opacity duration-500`}
        >
          {/* top left */}
          <div className="fixed left-4 top-4 flex items-center gap-4">
            <Timer />
            <LifxMain />
          </div>
          {/* bottom left */}
          <div className="fixed bottom-4 left-4 flex items-center gap-4">
            <ConnectionWrapper fallback={<p>Offline</p>}>
              <Weather />
            </ConnectionWrapper>
          </div>
          {/* bottom right */}
          <div className="fixed bottom-4 right-4 flex items-center gap-4">
            <Todos />
          </div>
          <MainClock />
          <Greeting />
          <Search />
          <Shortcuts />
        </div>
      </>
    )
  }
}
