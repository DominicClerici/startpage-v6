import { useContext } from "react"
import { ShowGreetingContext } from "../../../../context/general/GreetingContext"
import Toggle from "../../controls/Toggle"
import CustomGreeting from "./CustomGreeting"
import Name from "./Name"

export default function Greeting() {
  const { showGreeting } = useContext(ShowGreetingContext)
  return (
    <div className="mb-4 flex flex-col gap-4">
      <label htmlFor="showGreeting" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show greeting</h2>
        </span>
        <Toggle htmlFor="showGreeting" ctx={ShowGreetingContext} />
      </label>
      <label
        htmlFor="firstName"
        className={`grid grid-cols-3 items-center gap-8 transition-opacity ${!showGreeting && "pointer-events-none opacity-30"}`}
      >
        <span className="col-span-2">
          <h2 className="text-lg">Nickname</h2>
          <h3 className="text-muted-foreground"></h3>
        </span>
        <Name />
      </label>
      <label
        htmlFor="customGreeting"
        className={`grid grid-cols-3 items-center gap-8 transition-opacity ${!showGreeting && "pointer-events-none opacity-30"}`}
      >
        <span className="col-span-2">
          <h2 className="text-lg">Use custom greeting</h2>
          <h3 className="text-muted-foreground">Leave blank for no custom greeting</h3>
        </span>
        <CustomGreeting />
      </label>
    </div>
  )
}
