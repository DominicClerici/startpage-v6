import { Slider } from "@/components/ui/slider"
import { UnsplashBackgroundFiltersContext } from "@/context/appearance/BackgroundSettings"
import { useContext } from "react"

export default function Filters() {
  const { unsplashBackgroundFilters, setUnsplashBackgroundFilters } = useContext(UnsplashBackgroundFiltersContext)
  return (
    <div className="mb-4 flex flex-col gap-4">
      <label className="grid grid-cols-3 items-center gap-8">
        <span className="col-span-2">
          <h2 className="text-lg">Background darken</h2>
          <h3 className="text-muted-foreground">Use to enhance readability</h3>
        </span>
        <div>
          <Slider
            max={90}
            min={0}
            step={1}
            value={[unsplashBackgroundFilters.darken]}
            onValueChange={(value) => setUnsplashBackgroundFilters({ ...unsplashBackgroundFilters, darken: value[0] })}
          />
        </div>
      </label>
      <label className="grid grid-cols-3 items-center gap-8">
        <span className="col-span-2">
          <h2 className="text-lg">Background blur</h2>
          <h3 className="text-muted-foreground">Use to enhance readability</h3>
        </span>
        <div>
          <Slider
            max={12}
            min={0}
            step={1}
            value={[unsplashBackgroundFilters.blur]}
            onValueChange={(value) => setUnsplashBackgroundFilters({ ...unsplashBackgroundFilters, blur: value[0] })}
          />
        </div>
      </label>
    </div>
  )
}
