import { LifxApiKeyContext, LifxEnabledContext } from "@/context/integrations/Lifx"
import Toggle from "../../controls/Toggle"
import { useContext, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

export default function LifxSettings() {
  const { lifxEnabled } = useContext(LifxEnabledContext)
  const { lifxApiKey, setLifxApiKey } = useContext(LifxApiKeyContext)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleChangeKey = async () => {
    if (!inputRef.current) return
    if (inputRef.current.value.trim() === "") {
      setApiError(null)
      setLifxApiKey(null)
      return
    }
    const key = inputRef.current.value
    // make sure to test key to see if its valid
    const res = await fetch("https://api.lifx.com/v1/lights/all", {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
    if (res.status === 401) {
      setApiError("Invalid key")
    } else {
      setLifxApiKey(key)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="clockFormat" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Enable Lifx</h2>
          <h3 className="text-muted-foreground">Control your lights</h3>
        </span>
        <Toggle htmlFor="clockFormat" ctx={LifxEnabledContext} />
      </label>
      <div
        className={`transition-opacity ${lifxEnabled ? "opacity-100" : "pointer-events-none opacity-50"} flex flex-col gap-4`}
      >
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <h2 className="text-lg">LIFX Api key</h2>
            <h3 className="text-muted-foreground">What is this</h3>
            {apiError && <p className="text-red-500">That key is not valid</p>}
          </div>
          <Input onBlur={handleChangeKey} ref={inputRef} placeholder="ABC123" defaultValue={lifxApiKey}></Input>
        </div>
      </div>
    </div>
  )
}
