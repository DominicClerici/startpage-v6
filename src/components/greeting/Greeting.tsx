import { useContext } from "react"
import {
  CustomGreetingContext,
  MantraEnabledContext,
  MantraFrequencyContext,
  MantraOptionsContext,
  ShowGreetingContext,
} from "../../context/general/GreetingContext"
import { FirstNameContext } from "../../context/general/UserInfoContext"

function getGreeting() {
  const currentHour = new Date().getHours()
  let greeting

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning, "
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon, "
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good evening, "
  } else {
    greeting = "Good night, "
  }

  return greeting
}

export default function Greeting() {
  const { frequency } = useContext(MantraFrequencyContext)
  const { showGreeting } = useContext(ShowGreetingContext)
  const { mantraEnabled } = useContext(MantraEnabledContext)
  const { customGreeting } = useContext(CustomGreetingContext)
  const { options } = useContext(MantraOptionsContext)
  const { firstName } = useContext(FirstNameContext)

  let string = ""
  if (showGreeting) {
    if (customGreeting.trim() !== "") {
      string = `${customGreeting.trim()} ${firstName}`
    } else {
      string = getGreeting() + firstName
    }
  }

  if (mantraEnabled) {
    // TODO: make sure to add pool of curated mantras
    const mantra = options[Math.floor(Math.random() * options.length)]
    if (frequency === "1") {
      // 1% chance of showing mantra
      if (Math.random() < 0.01) {
        string = mantra
      }
    } else if (frequency === "2") {
      // 5% chance of showing mantra
      if (Math.random() < 0.05) {
        string = mantra
      }
    } else if (frequency === "3") {
      // 25% chance of showing mantra
      if (Math.random() < 0.25) {
        string = mantra
      }
    } else if (frequency === "4") {
      // 100% chance of showing mantra
      string = mantra
    }
  }
  return <p className="text-3xl font-medium text-muted-foreground">{string}</p>
}
