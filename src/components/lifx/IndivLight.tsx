import { DropletIcon, LightbulbOff, PowerIcon, Rainbow, SunIcon, ThermometerIcon } from "lucide-react"
import { LifxDataContext, LightData } from "./Lifx"
import { useContext, useEffect, useRef, useState } from "react"
import "./lifxStyles.css"
import { Button } from "../ui/button"
import { LifxRecentColorsContext } from "@/context/integrations/Lifx"
import { Separator } from "../ui/separator"
import { kelvin_table } from "./kelvinTable"

export default function IndivLight({ id }: { id: string }) {
  const { lightData, togglePower, updateColor } = useContext(LifxDataContext)
  const { lifxRecentColors } = useContext(LifxRecentColorsContext)
  const [isKelvin, setIsKelvin] = useState(lightData.find((light) => light.id === id).color.saturation === 0)
  const [isChangingPower, setIsChangingPower] = useState(false)
  const thisLightData = lightData.find((light) => light.id === id) as LightData

  // set all css vars appropriately
  useEffect(() => {
    document.documentElement.style.setProperty("--hue", `${thisLightData.color.hue}`)
    document.documentElement.style.setProperty(
      "--saturation",
      `${Math.max(Math.min(100, thisLightData.color.saturation * 100), 10)}%`,
    )
    document.documentElement.style.setProperty(
      "--brightness",
      `${Math.max(Math.min(50, (thisLightData.brightness * 100) / 2), 5)}%`,
    )
    document.documentElement.style.setProperty("--kelvin-color", kelvin_table[thisLightData.color.kelvin])
    document.documentElement.style.setProperty(
      "--kelvin-brightness",
      `${Math.min(Math.max(thisLightData.brightness * 100, 5), 100)}%`,
    )
  }, [thisLightData.color.hue, thisLightData.color.saturation, thisLightData.color.kelvin, thisLightData.brightness])

  return (
    <div className="relative">
      {thisLightData.connected === false ? (
        <div className="absolute inset-0 z-10 -m-3 flex flex-col items-center justify-center gap-2 rounded-md bg-background/50 backdrop-blur-sm">
          <LightbulbOff className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Could not connect.</p>
        </div>
      ) : null}
      <span className="flex items-center justify-between">
        <span>
          <h1 className="text-2xl font-bold leading-5">{thisLightData.name}</h1>
          {thisLightData.group ? <p className="font-light text-muted-foreground">{thisLightData.group.name}</p> : null}
        </span>
        <button
          onClick={() => {
            togglePower(id)
          }}
          className={`rounded-full p-2.5 transition-colors ${isChangingPower ? "animate-pulse bg-primary/50 text-background" : thisLightData.isOn ? "bg-primary text-background hover:bg-primary/80 active:bg-primary/60" : "bg-background text-primary ring-2 ring-border hover:bg-primary/10 active:bg-primary/20"}`}
        >
          <PowerIcon className="h-6 w-6" />
        </button>
      </span>
      <Separator className="my-2" />
      <div
        className={`flex justify-between gap-8 transition-opacity ${thisLightData.isOn ? "" : "pointer-events-none opacity-50"}`}
      >
        <div className="flex-shrink-0">
          <span className="flex items-center gap-2 rounded-lg border p-1">
            <Button
              onClick={() => {
                setIsKelvin(true)
              }}
              variant={isKelvin ? "default" : "secondary"}
            >
              Kelvin
            </Button>
            <Button
              onClick={() => {
                setIsKelvin(false)
              }}
              variant={isKelvin ? "secondary" : "default"}
            >
              Color
            </Button>
          </span>
          <div className="flex items-center justify-center gap-4">
            {isKelvin ? (
              <>
                <BrightnessKelvinSlider
                  toUpdate={async (e: number) => {
                    return await updateColor(`id:${id}`, { ...thisLightData.color, saturation: 0, brightness: e / 100 })
                  }}
                  data={thisLightData.brightness * 100}
                />
                <KelvinSlider
                  toUpdate={async (e: number) => {
                    setIsKelvin(true)
                    return await updateColor(`id:${id}`, {
                      ...thisLightData.color,
                      kelvin: e,
                      saturation: 0,
                      brightness: thisLightData.brightness,
                    })
                  }}
                  data={thisLightData.color.kelvin}
                />
              </>
            ) : (
              <>
                <BrightnessSlider
                  toUpdate={async (e: number) => {
                    return await updateColor(`id:${id}`, { ...thisLightData.color, brightness: e / 100 })
                  }}
                  data={thisLightData.brightness * 100}
                />
                <HueSlider
                  toUpdate={async (e: number) => {
                    return await updateColor(`id:${id}`, {
                      ...thisLightData.color,
                      hue: e,
                      brightness: thisLightData.brightness,
                    })
                  }}
                  data={thisLightData.color.hue}
                />
                <SaturationSlider
                  toUpdate={async (e: number) => {
                    return await updateColor(`id:${id}`, {
                      ...thisLightData.color,
                      saturation: e / 100,
                      brightness: thisLightData.brightness,
                    })
                  }}
                  data={thisLightData.color.saturation * 100}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="mb-1 text-xl font-semibold text-muted-foreground">Recent colors</h2>
          <div className="grid auto-rows-auto grid-cols-4 gap-2">
            {lifxRecentColors.map((color, index) => {
              if (color.kelvin) {
                return (
                  <div
                    onClick={() => {
                      updateColor(
                        `id:${id}`,
                        {
                          hue: 0,
                          saturation: 0,
                          brightness: color.brightness,
                          kelvin: color.kelvin,
                        },
                        true,
                      )
                    }}
                    key={"pc_" + index}
                    tabIndex={0}
                    className="h-8 w-8 cursor-pointer rounded"
                    style={{
                      backgroundColor: kelvin_table[color.kelvin],
                      filter: `brightness(${color.brightness * 100}%)`,
                    }}
                  ></div>
                )
              } else {
                return (
                  <div
                    onClick={() => {
                      updateColor(
                        `id:${id}`,
                        {
                          hue: color.hue,
                          saturation: color.saturation,
                          brightness: color.brightness,
                          kelvin: 5000,
                        },
                        true,
                      )
                    }}
                    key={"pc_" + index}
                    tabIndex={0}
                    className="h-8 w-8 cursor-pointer rounded"
                    style={{
                      backgroundColor: `hsl(${color.hue}, ${color.saturation * 100}%, ${color.brightness * 50}%)`,
                    }}
                  ></div>
                )
              }
            })}
          </div>
          <Button className="mt-auto" variant="outline">
            Save to pallete
          </Button>
        </div>
      </div>
    </div>
  )
}

const KelvinSlider = ({ toUpdate, data }) => {
  const [value, setValue] = useState<number>(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  document.documentElement.style.setProperty("--kelvin-color", `${kelvin_table[value]}`)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <ThermometerIcon className="h-5 w-5 text-muted-foreground" />
      <input
        min={1500}
        max={9000}
        step={100}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
        onMouseUp={(e) => {
          const val = parseInt(e.currentTarget.value)
          toUpdate(val).then((code) => {
            if (code === 1) {
              setValue(data)
            }
          })
        }}
        value={value}
        type="range"
        className="kelvinSlider customSlider"
      />
      <p className="min-w-10 text-center text-xs font-light text-muted-foreground">{value}K</p>
    </div>
  )
}

const BrightnessKelvinSlider = ({ toUpdate, data }) => {
  const [value, setValue] = useState<number>(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  const targetBrightness = Math.min(Math.max(value, 5), 100)
  document.documentElement.style.setProperty("--kelvin-brightness", `${targetBrightness}%`)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <SunIcon className="h-5 w-5 text-muted-foreground" />
      <input
        min={1}
        max={100}
        step={1}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
        onMouseUp={(e) => {
          const val = parseInt(e.currentTarget.value)
          toUpdate(val).then((code) => {
            if (code === 1) {
              setValue(data)
            }
          })
        }}
        value={value}
        type="range"
        className="brightnessKelvinSlider customSlider"
      />
      <p className="min-w-7 text-center text-xs font-light text-muted-foreground">{value}%</p>
    </div>
  )
}

const BrightnessSlider = ({ toUpdate, data }) => {
  const [value, setValue] = useState<number>(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  const targetLightness = Math.max(Math.min(50, value / 2), 5)
  document.documentElement.style.setProperty("--brightness", `${targetLightness}%`)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <SunIcon className="h-5 w-5 text-muted-foreground" />
      <input
        min={1}
        max={100}
        step={1}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
        onMouseUp={(e) => {
          const val = parseInt(e.currentTarget.value)
          toUpdate(val).then((code) => {
            if (code === 1) {
              setValue(data)
            }
          })
        }}
        value={value}
        type="range"
        className="brightnessBg customSlider"
      />
      <p className="min-w-7 text-center text-xs font-light text-muted-foreground">{value}%</p>
    </div>
  )
}

const HueSlider = ({ toUpdate, data }) => {
  const [value, setValue] = useState<number>(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  document.documentElement.style.setProperty("--hue", `${value}`)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <Rainbow className="h-5 w-5 text-muted-foreground" />
      <input
        min={0}
        max={360}
        step={1}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
        onMouseUp={(e) => {
          const val = parseInt(e.currentTarget.value)
          toUpdate(val).then((code) => {
            if (code === 1) {
              setValue(data)
            }
          })
        }}
        value={value}
        type="range"
        className="hueSlider customSlider"
      />
      <p className="min-w-7 text-center text-xs font-light text-muted-foreground">{value}&deg;</p>
    </div>
  )
}

const SaturationSlider = ({ toUpdate, data }) => {
  const [value, setValue] = useState<number>(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  const targetSaturation = Math.max(Math.min(100, value), 10)
  document.documentElement.style.setProperty("--saturation", `${targetSaturation}%`)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <DropletIcon className="h-5 w-5 text-muted-foreground" />
      <input
        min={0}
        max={100}
        step={1}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
        onMouseUp={(e) => {
          const val = parseInt(e.currentTarget.value)
          toUpdate(val).then((code) => {
            if (code === 1) {
              setValue(data)
            }
          })
        }}
        value={value}
        type="range"
        className="saturationSlider customSlider"
      />
      <p className="min-w-7 text-center text-xs font-light text-muted-foreground">{value}%</p>
    </div>
  )
}
