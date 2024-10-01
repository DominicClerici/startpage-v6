import { LifxApiKeyContext, LifxEnabledContext } from "@/context/integrations/Lifx"
import Toggle from "../../controls/Toggle"
import { useContext, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

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
            <h2 className="text-lg">LIFX API key</h2>
            <Popover>
              <PopoverTrigger>
                <h3 className="text-muted-foreground underline hover:text-foreground">What is this?</h3>
              </PopoverTrigger>
              <PopoverContent>
                <h1>LIFX API Key</h1>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <p className="text-lg">1.</p>
                    <a href="https://cloud.lifx.com/sign_in">
                      <Button variant="outline">Sign into LIFX API</Button>
                    </a>
                  </div>
                  <div className="flex items-start gap-1">
                    <p className="text-lg">2.</p>
                    <p className="text-muted-foreground">
                      In the top right of the page, navigate to{" "}
                      <span className="text-foreground">Personal access tokens</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-1">
                    <p className="text-lg">3.</p>
                    <p className="text-muted-foreground">
                      Click <span className="text-foreground">Generate new token</span>, then copy and paste the token
                      into the field in Spring Tab.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {apiError && <p className="text-red-500">That key is not valid</p>}
          </div>

          <Input onBlur={handleChangeKey} ref={inputRef} placeholder="ABC123" defaultValue={lifxApiKey}></Input>
        </div>
      </div>
    </div>
  )
}
