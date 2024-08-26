import { LightbulbIcon } from "lucide-react"
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import AnimateUnmount from "../lib/AnimateUnmount"
import Content from "./Content"
import { LifxApiKeyContext, LifxEnabledContext, LifxRecentColorsContext } from "@/context/integrations/Lifx"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

// code 429 is rate limit, 60 sec wait time

const exampleData = [
  {
    id: "d073d572f1e4",
    uuid: "a69610d1-32ee-47ca-bc5d-65c564ef0eba",
    label: "Apt",
    connected: false,
    power: "on",
    color: {
      hue: 284,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
  {
    id: "d073d572fa23",
    uuid: "a140a95f-6a96-416e-88ee-c58ae31981de",
    label: "Other",
    connected: true,
    power: "on",
    color: {
      hue: 41.75,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
  {
    id: "d073d572f1e4",
    uuid: "a69610d1-32ee-47ca-bc5d-65c564ef0eba",
    label: "Apt",
    connected: false,
    power: "on",
    color: {
      hue: 284,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
  {
    id: "d073d572fa23",
    uuid: "a140a95f-6a96-416e-88ee-c58ae31981de",
    label: "Other",
    connected: true,
    power: "on",
    color: {
      hue: 41.75,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
  {
    id: "d073d572f1e4",
    uuid: "a69610d1-32ee-47ca-bc5d-65c564ef0eba",
    label: "Apt",
    connected: false,
    power: "on",
    color: {
      hue: 284,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
  {
    id: "d073d572fa23",
    uuid: "a140a95f-6a96-416e-88ee-c58ae31981de",
    label: "Other",
    connected: true,
    power: "on",
    color: {
      hue: 41.75,
      saturation: 0,
      kelvin: 3500,
    },
    brightness: 1,
    group: {
      id: "26e796393c7c720f0d9dd2f9ffec00f1",
      name: "Bedroom",
    },
    location: {
      id: "b1c48de79596993931d72580ca820114",
      name: "Room",
    },
    product: {
      name: "LIFX Color",
      identifier: "lifx_color",
      company: "LIFX",
      vendor_id: 1,
      product_id: 91,
      capabilities: {
        has_color: true,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 9000,
      },
    },
    last_seen: "2024-08-19T00:32:59Z",
    seconds_since_seen: 0,
  },
]

const LightBulbIcon = ({ isActive, isOpen }: { isActive: boolean; isOpen: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={`h-12 w-12 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
    >
      <circle
        cx="12"
        cy="8"
        r={isActive ? "3.5" : "0"}
        strokeWidth="0"
        fill="currentColor"
        className="transition-all"
      />
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

export const LifxDataContext = createContext(null)
export const LifxMain = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [lightData, setLightData] = useState<LightData[] | null>(null)
  const [rateLimit, setRateLimit] = useState(false)
  const { lifxRecentColors, setLifxRecentColors } = useContext(LifxRecentColorsContext)
  const { lifxEnabled } = useContext(LifxEnabledContext)
  const { lifxApiKey } = useContext(LifxApiKeyContext)
  const isUpdatingColor = useRef(false)

  const requestHeaders = useMemo(
    () => ({
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${lifxApiKey}`,
    }),
    [lifxApiKey],
  )

  const updateColor = async (
    selector: string,
    data: { kelvin: number; hue: number; saturation: number; brightness: number },
    skipRecent?: boolean,
  ) => {
    if (isUpdatingColor.current) return 0
    isUpdatingColor.current = true
    const res = await fetch(`https://api.lifx.com/v1/lights/${selector}/state`, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({
        power: "on",
        duration: 0.5,
        color: `hue:${data.hue} saturation:${data.saturation} brightness:${data.brightness} kelvin:${data.kelvin}`,
      }),
    })
    if (res.status === 429) {
      isUpdatingColor.current = false
      setRateLimit(true)
      console.log("rate limit")
      return 1
    }
    if (res.status === 207) {
      const { results } = await res.json()
      const updated = results
        .filter((light) => {
          return light.status === "ok"
        })
        .map((light: any) => {
          return light.id
        })
      const newLightData = lightData.map((light) => {
        if (updated.includes(light.id)) {
          return {
            ...light,
            color: {
              hue: data.hue,
              saturation: data.saturation,
              kelvin: data.kelvin,
            },
            brightness: data.brightness,
          }
        } else {
          return light
        }
      })
      setLightData(newLightData)
      isUpdatingColor.current = false
      if (skipRecent) return 0
      if (lifxRecentColors.length >= 8) {
        const newColors = [...lifxRecentColors]
        newColors.pop()
        if (data.saturation === 0) {
          newColors.unshift({
            kelvin: data.kelvin,
            brightness: data.brightness,
          })
        } else {
          newColors.unshift({
            hue: data.hue,
            saturation: data.saturation,
            brightness: data.brightness,
          })
        }
        setLifxRecentColors(newColors)
      } else {
        if (data.saturation === 0) {
          setLifxRecentColors([
            {
              kelvin: data.kelvin,
              brightness: data.brightness,
            },
            ...lifxRecentColors,
          ])
        } else {
          setLifxRecentColors([
            {
              hue: data.hue,
              saturation: data.saturation,
              brightness: data.brightness,
            },
            ...lifxRecentColors,
          ])
        }
      }
      return 0
    } else {
      isUpdatingColor.current = false
      console.log("error")
      return 1
    }
  }

  const togglePower = async (selector: string) => {
    const res = await fetch(`https://api.lifx.com/v1/lights/${selector}/toggle`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ duration: 0.5 }),
    })
    if (res.status === 429) {
      setRateLimit(true)
      return 1
    } else if (res.status.toString().startsWith("2")) {
      const { results } = await res.json()
      const updated = results.map((light: any) => light.id)
      const newLightData = lightData.map((light) => {
        if (updated.includes(light.id)) {
          return {
            ...light,
            isOn: results.find((result: any) => result.id === light.id).power === "on",
          }
        } else {
          return light
        }
      })
      setLightData(newLightData)
      return 0
    } else {
      console.log("err toggling power", res.status)
      return 1
    }
  }

  const getLightData = async () => {
    const res = await fetch("https://api.lifx.com/v1/lights/all", {
      method: "GET",
      headers: requestHeaders,
    })
    if (res.status === 429) {
      setRateLimit(true)
      return
    }
    const data = await res.json()
    // const data = exampleData
    if (data.length === 0) {
      // no lights found
      setLightData([])
    } else {
      setLightData(
        data.map((light: any) => ({
          id: light.id,
          name: light.label,
          isOn: light.power === "on",
          group: light.group,
          location: light.location,
          color: light.color,
          brightness: light.brightness,
          connected: light.connected,
        })),
      )
    }
  }

  useEffect(() => {
    if (rateLimit) return
    const interval = setInterval(() => {
      getLightData()
    }, 5000)
    getLightData()
    return () => clearInterval(interval)
  }, [lifxEnabled, lifxApiKey, rateLimit])

  if (!lifxEnabled) return null
  if (!lightData) return null
  return (
    <LifxDataContext.Provider value={{ lightData, setLightData, togglePower, setRateLimit, rateLimit, updateColor }}>
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger
          className={`${isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"} group cursor-pointer rounded-lg p-2 transition-colors`}
        >
          <LightBulbIcon isActive={lightData.some((light) => light.isOn)} isOpen={isOpen} />
        </PopoverTrigger>
        {/* content */}
        <PopoverContent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          sideOffset={8}
          collisionPadding={16}
          className="w-auto overflow-hidden p-3"
        >
          <Content />
        </PopoverContent>
      </Popover>
    </LifxDataContext.Provider>
  )
}

export type LightData = {
  id: string
  name: string
  isOn: boolean
  group: {
    id: string
    name: string
  }
  location: {
    id: string
    name: string
  }
  color: {
    hue: number
    saturation: number
    kelvin: number
  }
  brightness: number
  connected: boolean
}
