import LayoutController from "./LayoutController"
import Background from "./components/background/Background"
import { TooltipProvider } from "./components/ui/tooltip"
import MainProvider from "./context/MainProvider"
import "./tabAnimations.css"

function App() {
  return (
    <MainProvider>
      <TooltipProvider delayDuration={400}>
        <main>
          {/* <Updater /> */}
          <Background />
          <LayoutController />
        </main>
      </TooltipProvider>
    </MainProvider>
  )
}

export default App
