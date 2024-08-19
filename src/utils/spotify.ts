const AUTH_ENDPOINT = "http://localhost:3001/login"
const REFRESH_ENDPOINT = "http://localhost:3001/refresh_token"

export const loginUrl = AUTH_ENDPOINT

export const getTokenFromUrl = (): { [key: string]: string } => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce(
      (initial, item) => {
        let parts = item.split("=")
        initial[parts[0]] = decodeURIComponent(parts[1])
        return initial
      },
      {} as { [key: string]: string },
    )
}

export const refreshAccessToken = async (refresh_token: string): Promise<any> => {
  const response = await fetch(REFRESH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh token")
  }

  return response.json()
}

export const initiateSpotifyLogin = (): void => {
  const loginWindow = window.open(AUTH_ENDPOINT, "Spotify Login", "width=800,height=600")

  if (!loginWindow) {
    console.error("Failed to open login window. Pop-up might be blocked.")
    alert("Failed to open login window. Please allow pop-ups for this site.")
    return
  }

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== "http://localhost:3001") {
      console.error("Invalid origin:", event.origin)
      return
    }

    const { type, accessToken, refreshToken, expiresIn } = event.data

    if (type === "SPOTIFY_CALLBACK" && accessToken && refreshToken && expiresIn) {
      localStorage.setItem("spotifyAccessToken", accessToken)
      localStorage.setItem("spotifyRefreshToken", refreshToken)
      localStorage.setItem("spotifyTokenExpiry", (Date.now() + parseInt(expiresIn) * 1000).toString())

      window.removeEventListener("message", handleMessage)
      loginWindow.close()
      window.location.reload()
    }
  }

  window.addEventListener("message", handleMessage)
}

export const logoutSpotify = (): void => {
  localStorage.removeItem("spotifyAccessToken")
  localStorage.removeItem("spotifyRefreshToken")
  localStorage.removeItem("spotifyTokenExpiry")
  location.reload()
}

export const getSpotifyTokens = () => {
  const accessToken = localStorage.getItem("spotifyAccessToken")
  const refreshToken = localStorage.getItem("spotifyRefreshToken")
  const tokenExpiry = localStorage.getItem("spotifyTokenExpiry")

  return { accessToken, refreshToken, tokenExpiry }
}
