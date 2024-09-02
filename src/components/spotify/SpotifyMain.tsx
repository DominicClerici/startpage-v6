import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ChevronRight, MusicIcon, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react"
import { getCurrentlyPlayingTrack, pausePlayback, resumePlayback, skipToNext, skipToPrevious } from "@/utils/spotifyAPI"
import { Button } from "../ui/button"
import "./spotifyStyle.css"
import { SpotifyIcon } from "../settings/integrations/Integrations"

const AnimatedIcon = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <svg className="h-10 w-10 fill-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
      <title>Audio Wave</title>
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_1"
        d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_2"
        d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_3"
        d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_4"
        d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_5"
        d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_6"
        d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_7"
        d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_8"
        d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
      />
      <path
        className={isPlaying ? "playing" : "not"}
        id="Line_9"
        d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
      />
    </svg>
  )
}

export default function SpotifyMain({ token }: { token: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const data = await getCurrentlyPlayingTrack()
        if (!data) {
          setCurrentTrack(null)
          return
        }
        if (data.item.id !== currentTrack?.id) {
          setCurrentTrack(data.item)
          setIsPlaying(data.is_playing)
        }
      } catch (error) {
        console.error("Error fetching current track:", error)
      }
    }
    fetchCurrentTrack()
    const interval = setInterval(fetchCurrentTrack, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [token, currentTrack?.id])

  const handlePlayPause = async () => {
    setIsFetching(true)
    try {
      if (isPlaying) {
        await pausePlayback()
      } else {
        await resumePlayback()
      }
      setIsFetching(false)
      setIsPlaying(!isPlaying)
    } catch (error) {
      setIsFetching(false)
      console.error("Error toggling playback:", error)
    }
  }

  const handleNext = async () => {
    setIsFetching(true)
    try {
      await skipToNext()
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error("Error skipping to next track:", error)
    }
  }

  const handlePrevious = async () => {
    setIsFetching(true)
    try {
      await skipToPrevious()
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error("Error skipping to previous track:", error)
    }
  }

  const CurrentlyPlaying = () => {
    if (!currentTrack) {
      return <div>No track currently playing</div>
    }

    console.log(currentTrack)
    return (
      <div>
        <span className="mb-2 flex items-center justify-between gap-2">
          <AnimatedIcon isPlaying={true} />
          <a
            href={currentTrack.external_urls.spotify}
            target="_blank"
            className="group flex items-center gap-2 text-2xl font-light text-muted-foreground"
          >
            <SpotifyIcon className="h-6 w-6 fill-[#1ED760]" />{" "}
            <ChevronRight className="h-4 w-4 -translate-x-1 transition-transform group-hover:translate-x-0" />
          </a>
        </span>
        <div className="flex items-center gap-2">
          <div
            className="h-20 w-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentTrack.album.images[0].url})` }}
          ></div>
          <span>
            <p className="line-clamp-2 max-w-64 text-xl font-medium leading-5">{currentTrack.name}</p>
            <p className="line-clamp-1 max-w-64 leading-5 text-muted-foreground">
              {currentTrack.artists.map((item: any) => item.name).join(", ")}
            </p>
          </span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button
            disabled={isFetching}
            onClick={handlePrevious}
            variant="outline"
            className="group flex-grow text-muted-foreground hover:text-foreground"
          >
            <SkipBackIcon className="h-6 w-6 scale-90 transition-transform duration-75 group-hover:scale-100 group-active:scale-90" />
          </Button>
          <Button
            disabled={isFetching}
            variant="outline"
            className="group flex-grow text-muted-foreground hover:text-foreground"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6 scale-90 transition-transform duration-75 group-hover:scale-100 group-active:scale-90" />
            ) : (
              <PlayIcon className="h-6 w-6 scale-90 transition-transform duration-75 group-hover:scale-100 group-active:scale-90" />
            )}
          </Button>
          <Button
            disabled={isFetching}
            onClick={handleNext}
            variant="outline"
            className="group flex-grow text-muted-foreground hover:text-foreground"
          >
            <SkipForwardIcon className="h-6 w-6 scale-90 transition-transform duration-75 group-hover:scale-100 group-active:scale-90" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Popover onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={`${isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"} group cursor-pointer rounded-lg p-2 transition-colors`}
      >
        <MusicIcon
          className={`h-12 w-12 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <CurrentlyPlaying />
      </PopoverContent>
    </Popover>
  )
}
