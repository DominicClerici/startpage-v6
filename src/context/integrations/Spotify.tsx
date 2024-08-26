import useChromeStorage from "@/hooks/useChromeStorage"
import { createContext } from "react"

export const SpotifyEnabledContext = createContext(null)
const spotifyEnabledDefault = false
const SpotifyEnabledProvider = ({ children }) => {
  const [spotifyEnabled, setSpotifyEnabled] = useChromeStorage("spotifyEnabled", spotifyEnabledDefault)
  return (
    <SpotifyEnabledContext.Provider value={{ spotifyEnabled, setSpotifyEnabled }}>
      {children}
    </SpotifyEnabledContext.Provider>
  )
}

export const SpotifyProvider = ({ children }) => {
  return <SpotifyEnabledProvider>{children}</SpotifyEnabledProvider>
}
