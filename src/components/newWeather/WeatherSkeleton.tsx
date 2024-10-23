import { CircleIcon, DropletIcon, SunriseIcon, SunsetIcon, ThermometerIcon } from "lucide-react"
import Loading from "../lib/Loading"
import { Select, SelectTrigger } from "../ui/select"

export default function WeatherSkeleton() {
  return (
    <>
      <div className="pointer-events-none flex select-none flex-col gap-2 px-2 py-2 opacity-50">
        <div className="flex items-center gap-2 pl-4">
          <Loading className="h-9 w-9" />

          <div>
            <h2>--</h2>
            <h1 className="flex items-start font-inter text-2xl font-semibold leading-none">
              {" "}
              <span className="text-sm font-light leading-none text-muted-foreground"></span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className={`flex items-center justify-center gap-1 rounded-md border py-2`}>
            <ThermometerIcon className="h-7 w-7" />
            <div>
              <p className="text-sm text-muted-foreground">Feels like</p>
              <p className="flex items-start font-inter text-xl">
                <span className="leading-none">--</span>
                <span className="text-sm font-light leading-none text-muted-foreground"></span>
              </p>
            </div>
          </div>
          <div className={`flex items-center justify-center gap-1 rounded-md border py-2`}>
            <CircleIcon className="h-7 w-7" />
            <div>
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className="flex items-start font-inter text-xl">
                <span className="leading-none">--</span>
              </p>
            </div>
          </div>
          <div className={`flex items-center justify-center gap-1 rounded-md border py-2`}>
            <DropletIcon className="h-7 w-7" />
            <div>
              <p className="text-sm text-muted-foreground">Rain odds</p>
              <p className="flex items-center font-inter text-xl">
                <span className="leading-none">--</span>
                <span className="text-sm font-light leading-none text-muted-foreground"> </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-center gap-1 rounded-md border py-2">
            <SunriseIcon className="h-7 w-7" />
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="flex items-end font-inter text-lg">
                <span className="leading-none">--</span>
                <span className="text-xs font-light leading-none text-muted-foreground"> </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md border py-2">
            <SunsetIcon className="h-7 w-7" />
            <div>
              <p className="text-sm text-muted-foreground">Sunset</p>
              <p className="flex items-end font-inter text-lg">
                <span className="leading-none">--</span>
                <span className="text-xs font-light leading-none text-muted-foreground"> </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-2">
        <Select disabled>
          <SelectTrigger></SelectTrigger>
        </Select>
      </div>
      <div className="px-2 py-2">
        <div className="min-h-[200px] w-full rounded-lg border"></div>
      </div>
    </>
  )
}
