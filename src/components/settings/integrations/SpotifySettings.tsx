import { SpotifyEnabledContext } from "@/context/integrations/Spotify"
import { useContext } from "react"
import Toggle from "../controls/Toggle"
import { initiateSpotifyLogin, logoutSpotify } from "@/utils/spotify"
import { SpotifyIcon } from "./Integrations"

export default function SpotifySettings() {
  const { spotifyEnabled } = useContext(SpotifyEnabledContext)
  const accessToken = localStorage.getItem("spotifyAccessToken")

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Enable Spotify</h2>
          <h3 className="text-muted-foreground">See what music you have playing</h3>
        </span>
        <Toggle htmlFor="clockFormat" ctx={SpotifyEnabledContext} />
      </label>
      <div
        className={`transition-opacity ${spotifyEnabled ? "opacity-100" : "pointer-events-none opacity-50"} flex flex-col gap-4`}
      >
        {accessToken ? <LoggedInView /> : <LoggedOutView />}
      </div>
    </div>
  )
}

const LoggedInView = () => {
  return (
    <div className="grid grid-cols-3 items-center">
      <span className="col-span-2">
        <h2 className="text-lg">Logged in</h2>
      </span>
      <button
        className="rounded-md border-2 bg-[#1ED760] px-2 py-2 text-lg font-medium text-background hover:brightness-90"
        onClick={() => logoutSpotify()}
      >
        Log out
      </button>
    </div>
  )
}
const LoggedOutView = () => {
  return (
    <div className="grid grid-cols-5 items-center">
      <span className="col-span-3">
        <h2 className="text-lg">You are not logged in</h2>
        <h3 className="text-muted-foreground">Log in to see your music</h3>
      </span>
      <button
        className="col-span-2 flex items-center justify-center gap-2 rounded-md border-2 bg-[#1ED760] px-2 py-2 text-lg font-medium text-background hover:brightness-90"
        onClick={() => initiateSpotifyLogin()}
      >
        <SpotifyIcon className="h-5 w-5 fill-current" />
        Login with spotify
      </button>
    </div>
  )
}
