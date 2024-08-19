import React, { useContext, useEffect, useState } from "react"
import { refreshAccessToken, getSpotifyTokens } from "@/utils/spotify"
import SpotifyMain from "./SpotifyMain"
import { SpotifyEnabledContext } from "@/context/integrations/Spotify"

const SpotifyAuthController: React.FC = () => {
  const { spotifyEnabled } = useContext(SpotifyEnabledContext)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (spotifyEnabled) {
      const refreshTokenF = async (refresh_token: string) => {
        try {
          const data = await refreshAccessToken(refresh_token)
          setToken(data.access_token)
          localStorage.setItem("spotifyAccessToken", data.access_token)
          localStorage.setItem("spotifyTokenExpiry", (Date.now() + data.expires_in * 1000).toString())

          // Set a timer to refresh the token before it expires
          setTimeout(() => refreshTokenF(refresh_token), data.expires_in * 1000 - 60000)
        } catch (error) {
          console.error("Failed to refresh token", error)
          // Handle error - perhaps by initiating a new login
        }
      }

      const { accessToken, refreshToken, tokenExpiry } = getSpotifyTokens()

      if (accessToken && tokenExpiry && Number(tokenExpiry) > Date.now()) {
        setToken(accessToken)
      } else if (refreshToken) {
        refreshTokenF(refreshToken)
      } else {
        console.log("No valid tokens found")
      }
    }
  }, [spotifyEnabled])

  if (!spotifyEnabled) return null
  return <>{token && <SpotifyMain token={token} />}</>
}

export default SpotifyAuthController
