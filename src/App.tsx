import LayoutController from "./LayoutController"
import Background from "./components/background/Background"
import MainProvider from "./context/MainProvider"
import "./tabAnimations.css"

function App() {
  return (
    <MainProvider>
      <main>
        {/* <Updater /> */}
        <Background />
        <LayoutController />
      </main>
    </MainProvider>
  )
}

export default App
