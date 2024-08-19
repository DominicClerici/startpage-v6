import { getSpotifyTokens, refreshAccessToken } from "./spotify"

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1"

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
}

interface CurrentlyPlayingResponse {
  is_playing: boolean
  item: SpotifyTrack
  progress_ms: number
}

async function getValidAccessToken(): Promise<string> {
  const { accessToken, refreshToken, tokenExpiry } = getSpotifyTokens()

  if (accessToken && tokenExpiry && Number(tokenExpiry) > Date.now()) {
    return accessToken
  } else if (refreshToken) {
    const newTokens = await refreshAccessToken(refreshToken)
    return newTokens.access_token
  } else {
    throw new Error("No valid access token or refresh token available")
  }
}

export async function getCurrentlyPlayingTrack(): Promise<CurrentlyPlayingResponse | null> {
  try {
    const accessToken = await getValidAccessToken()
    const response = await fetch(`${SPOTIFY_BASE_URL}/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.status === 204) {
      // No track currently playing
      return null
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching currently playing track:", error)
    throw error
  }
}

export async function pausePlayback(): Promise<void> {
  try {
    const accessToken = await getValidAccessToken()
    const response = await fetch(`${SPOTIFY_BASE_URL}/me/player/pause`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error pausing playback:", error)
    throw error
  }
}

export async function resumePlayback(): Promise<void> {
  try {
    const accessToken = await getValidAccessToken()
    const response = await fetch(`${SPOTIFY_BASE_URL}/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error resuming playback:", error)
    throw error
  }
}

export async function skipToNext(): Promise<void> {
  try {
    const accessToken = await getValidAccessToken()
    const response = await fetch(`${SPOTIFY_BASE_URL}/me/player/next`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error skipping to next track:", error)
    throw error
  }
}

export async function skipToPrevious(): Promise<void> {
  try {
    const accessToken = await getValidAccessToken()
    const response = await fetch(`${SPOTIFY_BASE_URL}/me/player/previous`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error skipping to previous track:", error)
    throw error
  }
}
