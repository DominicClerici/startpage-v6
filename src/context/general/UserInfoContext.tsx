import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const FirstNameContext = createContext(null)
const defaultFirstName = null
const FirstNameProvider = ({ children }) => {
  const [firstName, setFirstName] = useChromeStorage("firstName", defaultFirstName)
  return <FirstNameContext.Provider value={{ firstName, setFirstName }}>{children}</FirstNameContext.Provider>
}

export const UserInfoProvider = ({ children }) => {
  return <FirstNameProvider>{children}</FirstNameProvider>
}
