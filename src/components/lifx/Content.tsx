import { useContext, useMemo, useState } from "react"
import IndivLight from "./IndivLight"
import { LifxDataContext, LightData } from "./Lifx"
import * as Tabs from "@radix-ui/react-tabs"
import { ChevronLeft, ChevronRight, PowerIcon } from "lucide-react"
import { kelvin_table } from "./kelvinTable"
import { Button } from "../ui/button"

// is being passed in as lightData prop

export default function Content() {
  const { lightData } = useContext(LifxDataContext)
  if (lightData.length === 0) return <p>No lights found</p>
  if (lightData.length === 1) {
    return <IndivLight id={lightData[0].id} />
  } else {
    return <ViewNavigationControl />
  }
}

const className = {
  tab: "flex-1 px-3 py-1 m-1 z-10 text-lg data-[state='active']:bg-secondary data-[state='active']:pointer-events-none text-muted-foreground transition-colors duration-75 rounded hover:bg-secondary/50 cursor-pointer text-center data-[state='active']:text-foreground",
}

const ViewNavigationControl = () => {
  const { lightData, togglePower } = useContext(LifxDataContext)
  const [currentTab, setCurrentTab] = useState("lights")
  const [isSwitchingLeft, setIsSwitchingLeft] = useState(false)
  const [view, setView] = useState<null | string>(null)
  const handleTabChange = (e) => {
    setCurrentTab((prev) => {
      const newIndex = ["lights", "groups", "rooms"].indexOf(e)
      const prevIndex = ["lights", "groups", "rooms"].indexOf(prev)
      if (prevIndex < newIndex) {
        setIsSwitchingLeft(true)
      } else {
        setIsSwitchingLeft(false)
      }
      return e
    })
  }

  const handleSetView = (selector: string) => {
    setView(selector)
  }

  // make new object called groups that is an array of all the groups
  // each item has an id and a name and all of its lights.
  // this is to make the groups tab work
  const groups = useMemo(() => {
    const grps = []
    lightData.forEach((light) => {
      if (light.group) {
        if (!grps.find((group) => group.id === light.group.id)) {
          grps.push({
            id: light.group.id,
            name: light.group.name,
            lights: [light],
          })
        } else {
          grps.find((group) => group.id === light.group.id).lights.push(light)
        }
      }
    })
    return grps
  }, [lightData.length])
  const locations = useMemo(() => {
    const locs = []
    lightData.forEach((light) => {
      if (light.location) {
        if (!locs.find((location) => location.id === light.location.id)) {
          locs.push({
            id: light.location.id,
            name: light.location.name,
            lights: [light],
          })
        } else {
          locs.find((location) => location.id === light.location.id).lights.push(light)
        }
      }
    })
    return locs
  }, [lightData.length])

  if (!view) {
    return (
      <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
        <Tabs.List className="relative mb-2 flex min-w-80 items-center gap-1 rounded">
          <Tabs.Trigger value="lights" className={className.tab}>
            Lights
          </Tabs.Trigger>
          <Tabs.Trigger value="groups" className={className.tab}>
            Groups
          </Tabs.Trigger>
          <Tabs.Trigger value="rooms" className={className.tab}>
            Rooms
          </Tabs.Trigger>
        </Tabs.List>
        <div className="relative">
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="lights">
            <div className="customScrollBar max-h-80 min-h-80 overflow-y-scroll px-1 pb-2">
              <div className="flex flex-col gap-1">
                {lightData.map((light) => {
                  return <IndividualLightListItem setView={setView} key={light.id} id={light.id} />
                })}
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="groups">
            <div className="customScrollBar max-h-80 min-h-80 overflow-y-scroll px-1 pb-2">
              <div className="flex flex-col gap-1">
                {groups.map((group) => {
                  return (
                    <IndividualGroupItem
                      setView={handleSetView}
                      key={group.id}
                      id={group.id}
                      name={group.name}
                      lightsOn={group.lights.filter((light) => light.isOn).length}
                    />
                  )
                })}
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content className={isSwitchingLeft ? "moveLeft" : "moveRight"} value="rooms">
            <div className="customScrollBar max-h-80 min-h-80 overflow-y-scroll px-1 pb-2">
              <div className="flex flex-col gap-1">
                {locations.map((location) => {
                  return (
                    <IndividualGroupItem
                      location={true}
                      setView={handleSetView}
                      key={location.id}
                      id={location.id}
                      name={location.name}
                      lightsOn={location.lights.filter((light) => light.isOn).length}
                    />
                  )
                })}
              </div>
            </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    )
  } else {
    if (view.startsWith("group:")) {
      const group = groups.find((group) => group.id === view.slice(6))
      return (
        <div>
          <span className="mb-2 flex min-w-80 items-center">
            <button className="group -ml-2 p-2" onClick={() => setView(null)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">{group.name}</h1>
            <Button
              onClick={() => {
                togglePower(`group_id:${group.id}`)
              }}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              <span>Toggle all</span>
            </Button>
          </span>
          <div className="customScrollBar mt-2 max-h-80 min-h-80 overflow-y-scroll px-1">
            <div className="flex flex-col gap-1">
              {group.lights.map((light) => {
                return <IndividualLightListItem setView={setView} key={light.id} id={light.id} />
              })}
            </div>
          </div>
        </div>
      )
    } else if (view.startsWith("id:")) {
      return (
        <IndivLight
          back={() => {
            setView(null)
          }}
          id={view.slice(3)}
        />
      )
    } else if (view.startsWith("location:")) {
      const location = locations.find((location) => location.id === view.slice(9))
      console.log(location)
      return (
        <div>
          <span className="mb-2 flex min-w-80 items-center">
            <button className="group -ml-2 p-2" onClick={() => setView(null)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">{location.name}</h1>
            <Button
              onClick={() => {
                togglePower(`location_id:${location.id}`)
              }}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              <span>Toggle all</span>
            </Button>
          </span>
          <div className="customScrollBar mt-2 max-h-80 min-h-80 overflow-y-scroll px-1">
            <div className="flex flex-col gap-1">
              {location.lights.map((light) => {
                return <IndividualLightListItem setView={setView} key={light.id} id={light.id} />
              })}
            </div>
          </div>
        </div>
      )
    }
  }
}

const IndividualGroupItem = ({
  id,
  name,
  lightsOn,
  setView,
  location = false,
}: {
  id: string
  name: string
  lightsOn: number
  setView: (selector: string) => void
  location?: boolean
}) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded border p-2">
      <span className="flex flex-col">
        <h1 className="text-lg font-semibold leading-5">{name}</h1>
        <h2 className="text-sm font-light leading-5 text-muted-foreground">
          {lightsOn === 1 ? "1 light on" : `${lightsOn} lights on`}
        </h2>
      </span>
      <button
        onClick={() => {
          if (location) {
            setView(`location:${id}`)
          } else {
            setView(`group:${id}`)
          }
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

const IndividualLightListItem = ({ id, setView }: { id: string; setView: (selector: string) => void }) => {
  const [isPowerLoading, setIsPowerLoading] = useState(false)
  const { lightData, togglePower } = useContext(LifxDataContext)
  const thisLight = lightData.find((light) => light.id === id) as LightData
  return (
    <div
      className={`${!thisLight.connected ? "pointer-events-none opacity-30" : ""} flex items-center gap-2 rounded border p-2`}
    >
      <div
        className="h-8 w-8 rounded-lg border-2 transition-colors duration-300"
        style={
          !thisLight.isOn
            ? { backgroundColor: "transparent" }
            : thisLight.color.saturation === 0
              ? {
                  backgroundColor: kelvin_table[thisLight.color.kelvin],
                  filter: `brightness(${thisLight.brightness * 100}%)`,
                }
              : {
                  backgroundColor: `hsl(${thisLight.color.hue}, ${thisLight.color.saturation * 100}%, ${thisLight.brightness * 50}%)`,
                }
        }
      ></div>
      <span className="flex flex-col">
        <h1 className="text-lg font-semibold leading-5">{thisLight.name}</h1>
        <h2 className="text-sm font-light leading-5 text-muted-foreground">{thisLight.group.name}</h2>
      </span>
      <button
        disabled={isPowerLoading}
        className={`ml-auto rounded-full border p-2 transition-colors ${isPowerLoading ? "bg-secondary text-foreground" : thisLight.isOn ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
        onClick={async () => {
          setIsPowerLoading(true)
          await togglePower(`id:${thisLight.id}`)
          setIsPowerLoading(false)
        }}
      >
        <PowerIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => {
          setView(`id:${thisLight.id}`)
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
