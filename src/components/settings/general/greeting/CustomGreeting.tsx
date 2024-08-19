import { useContext, useState } from "react"
import { CustomGreetingContext } from "../../../../context/general/GreetingContext"
import { Input } from "@/components/ui/input"

export default function CustomGreeting() {
  const { customGreeting, setCustomGreeting } = useContext(CustomGreetingContext)
  const [currentGreeting, setCurrentGreeting] = useState(customGreeting)

  return (
    <Input
      id="customGreeting"
      placeholder="No custom greeting"
      value={currentGreeting}
      onChange={(e) => setCurrentGreeting(e.target.value)}
      onBlur={() => setCustomGreeting(currentGreeting)}
    />
  )
}
