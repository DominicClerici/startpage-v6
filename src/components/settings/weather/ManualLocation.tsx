import AnimateUnmount from "@/components/lib/AnimateUnmount"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { WeatherLocationContext, WeatherLocationOptions } from "@/context/weather/WeatherProvider"
import { AlertTriangleIcon, InfoIcon, Loader2, PlusIcon, TrashIcon } from "lucide-react"
import { useCallback, useContext, useEffect, useRef, useState } from "react"

export default function ManualLocation() {
  const { weatherLocationOptions, setWeatherLocationOptions } = useContext(WeatherLocationOptions)
  const { weatherLocation, setWeatherLocation } = useContext(WeatherLocationContext)
  const [isAdding, setIsAdding] = useState(true)

  return (
    <>
      {weatherLocation.lat === 0 && weatherLocation.lon === 0 && weatherLocation.name === "none" && (
        <div className="flex items-center gap-4 rounded border p-2 text-alert">
          <AlertTriangleIcon className="h-10 w-10" />
          No location set. Please select a location or use GPS location to display weather.
        </div>
      )}
      <Card className={`rounded-lg border bg-card p-0`}>
        <CardHeader className="flex flex-col space-y-0 p-3">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Custom location</CardTitle>
            <Button
              variant="secondary"
              onClick={() => {
                setIsAdding(!isAdding)
              }}
            >
              <PlusIcon className={`${isAdding ? "rotate-45" : "rotate-0"} transition-transform`} />
            </Button>
          </div>
          <AnimateUnmount active={isAdding}>
            <AddNewLocation
              action={(data) => {
                setWeatherLocationOptions([
                  ...weatherLocationOptions,
                  { lat: data.lat, lon: data.lon, name: data.name, id: data.id },
                ])
                setWeatherLocation(data)
                setIsAdding(false)
              }}
            />
          </AnimateUnmount>
        </CardHeader>
        <CardContent className="flex flex-col space-y-0 border-t px-4 py-2">
          {weatherLocationOptions.length > 0 ? (
            weatherLocationOptions.map((loc) => {
              const isActive = loc.id === weatherLocation.id
              return (
                <div key={loc.id} className="flex items-center justify-between">
                  <Button
                    onClick={() => {
                      setWeatherLocation(loc)
                    }}
                    size="icon"
                    variant="ghost"
                    className="peer order-3 flex-shrink-0"
                  >
                    <CircleSVG isActive={isActive} />
                  </Button>
                  <Button
                    onClick={() => {
                      const newOptions = weatherLocationOptions.filter((location) => location.id !== loc.id)
                      setWeatherLocationOptions(newOptions)
                      if (weatherLocation.id === loc.id) {
                        if (newOptions.length > 0) {
                          console.log("setting to top available")
                          setWeatherLocation(newOptions[0])
                        } else {
                          setWeatherLocation({ lat: 0, lon: 0, name: "none" })
                        }
                      }
                    }}
                    size="icon"
                    variant="ghost"
                    className="peer order-2 ml-auto flex-shrink-0 text-muted-foreground hover:bg-destructive/40 hover:text-destructive-foreground"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                  <span
                    className={`order-1 ${isActive ? "text-foreground" : "text-muted-foreground peer-hover:text-foreground"} `}
                  >
                    {loc.name}
                  </span>
                </div>
              )
            })
          ) : (
            <div className="text-muted-foreground">No custom locations</div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

const CircleSVG = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <circle
        className={`${isActive ? "scale-100" : "scale-0"} origin-center transition-transform duration-300`}
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

const AddNewLocation = ({ action }) => {
  const [currentSearchText, setCurrentSearchText] = useState("")
  const [addressResults, setAddressResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isConfirmationStep, setIsConfirmationStep] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [customName, setCustomName] = useState("")
  const timeoutRef = useRef(null)
  const cacheRef = useRef({})
  const listRef = useRef(null)

  const searchAddress = useCallback(async (query) => {
    if (cacheRef.current[query]) {
      setAddressResults(cacheRef.current[query])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      )
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      const results = data.slice(0, 5)
      setAddressResults(results)
      cacheRef.current[query] = results
    } catch (err) {
      setError("An error occurred while searching. Please try again.")
      setAddressResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setCurrentSearchText(value)
    setSelectedIndex(-1)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (value.length > 2) {
      timeoutRef.current = setTimeout(() => {
        searchAddress(value)
      }, 500)
    } else {
      setAddressResults([])
    }
  }

  const handleKeyDown = (e) => {
    if (addressResults.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex < addressResults.length - 1 ? prevIndex + 1 : prevIndex))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex !== -1) {
          handleSelectItem(addressResults[selectedIndex])
        }
        break
      default:
        break
    }
  }

  const handleMouseEnter = (index) => {
    setSelectedIndex(index)
  }

  const handleSelectItem = (item) => {
    setSelectedLocation({
      name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    })
    setCustomName(item.display_name)
    setIsConfirmationStep(true)
  }

  const handleCancel = () => {
    setIsConfirmationStep(false)
    setSelectedLocation(null)
    setCustomName("")
    setCurrentSearchText("")
    setAddressResults([])
  }

  const handleContinue = () => {
    action({
      ...selectedLocation,
      name: customName,
      id: new Date().getTime(),
    })
  }

  useEffect(() => {
    if (selectedIndex !== -1 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  if (isConfirmationStep) {
    return (
      <div className="mt-2 space-y-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Name:</p>
          <p>{selectedLocation.name}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-grow flex-col">
            <p className="text-sm text-muted-foreground">Latitude:</p>
            <p>{selectedLocation.lat}</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-grow flex-col">
            <p className="text-sm text-muted-foreground">Longitude:</p>
            <p>{selectedLocation.lon}</p>
          </div>
        </div>
        <div>
          <label htmlFor="custom-name" className="text-sm text-muted-foreground">
            Custom Name (optional):
          </label>
          <Input
            id="custom-name"
            maxLength={255}
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter a custom name for this location"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-2 space-y-4">
      <div className="relative">
        <Input
          placeholder="221B Baker St."
          value={currentSearchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={127}
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {addressResults.length > 0 && (
        <ul ref={listRef} className="">
          {addressResults.map((result, index) => (
            <li
              key={index}
              className={`cursor-pointer rounded px-2 py-1 text-sm ${index === selectedIndex && "bg-hover"}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleSelectItem(result)}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
