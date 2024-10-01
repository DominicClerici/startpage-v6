import { useContext, useState } from "react"
import { Input } from "@/components/ui/input"
import { FirstNameContext } from "@/context/general/UserInfoContext"

export default function Name() {
  const { firstName, setFirstName } = useContext(FirstNameContext)
  const [currentName, setCurrentName] = useState(firstName)

  return (
    <Input
      id="customGreeting"
      placeholder="John Doe"
      value={currentName}
      onChange={(e) => setCurrentName(e.target.value)}
      onBlur={() => setFirstName(currentName)}
    />
  )
}
