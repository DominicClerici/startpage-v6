import { LifxProvider } from "./Lifx"
import { SpotifyProvider } from "./Spotify"

export const Integrations = ({ children }) => {
  return (
    <LifxProvider>
      <SpotifyProvider>{children}</SpotifyProvider>
    </LifxProvider>
  )
}
