import { UnsplashBackgroundContext, UnsplashBackgroundFiltersContext } from "@/context/appearance/BackgroundSettings"
import { useContext, useState } from "react"
import { Blurhash } from "react-blurhash"

export default function Unsplash() {
  const [isLoading, setIsLoading] = useState(true)
  const { unsplashBackground } = useContext(UnsplashBackgroundContext)
  const { unsplashBackgroundFilters } = useContext(UnsplashBackgroundFiltersContext)
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      {unsplashBackground.blurhash && (
        <Blurhash className="opacity" hash={unsplashBackground.blurhash} width={"100%"} height={"100%"} />
      )}
      <img
        style={{
          filter: `brightness(${100 - unsplashBackgroundFilters.darken}%) blur(${unsplashBackgroundFilters.blur}px)`,
          transform: "scale(1.07)",
        }}
        src={unsplashBackground.photo}
        alt={unsplashBackground.alt}
        className={`absolute left-0 top-0 h-screen w-screen object-cover object-center transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
