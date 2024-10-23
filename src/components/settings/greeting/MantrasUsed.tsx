import { useContext, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimateUnmount from "@/components/lib/AnimateUnmount"
import { Separator } from "@/components/ui/separator"
import Toggle from "../controls/Toggle"
import { MantraOptionsContext } from "@/context/general/GreetingContext"

export default function MantrasUsed() {
  const { options, setOptions } = useContext(MantraOptionsContext)
  const [isAdding, setIsAdding] = useState(false)
  const mantraInputRef = useRef<HTMLInputElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddMantra = () => {
    if (!mantraInputRef.current || !submitButtonRef.current) {
      return
    }
    const mantra = mantraInputRef.current.value
    // mantra must be more than 4 characters, less than 255 and there must be less than 500 total mantras
    if (mantra.length < 5) {
      setError("Must be more than 4 letters")
      return
    }
    if (mantra.length > 255) {
      setError("Must be less than 255 letters")
      return
    }
    if (options.length >= 30) {
      setError("30 max mantras")
      return
    }
    if (options.includes(mantra)) {
      setError("Mantra already exists")
      return
    }
    setError(null)
    setOptions([mantra, ...options])
    mantraInputRef.current.value = ""
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddMantra()
    } else if (e.key === "Escape") {
      setIsAdding(false)
      setError(null)
    }
  }

  return (
    <>
      <Card className="rounded-lg border bg-card">
        <CardHeader className="gap-2 p-3">
          <div className="flex flex-row items-center justify-between">
            <span>
              <CardTitle>Your mantras</CardTitle>
              {error && <p className="my-1 animate-[fadeScaleIn_.2s_ease-out] text-destructive">{error}</p>}
            </span>
            <Button
              onClick={() => {
                setIsAdding(!isAdding)
                setError(null)
              }}
              size="icon"
              variant="secondary"
            >
              <PlusIcon
                className={`h-5 w-5 transition-transform duration-150 ${isAdding ? "rotate-45" : "rotate-0"}`}
              />
            </Button>
          </div>

          <AnimateUnmount active={isAdding} animationOpen="fadeIn" animationClose="fadeOut">
            <span className="flex items-center gap-2">
              <Input
                onKeyDown={handleKeyDown}
                ref={mantraInputRef}
                type="text"
                placeholder="Enter your custom mantra"
              />
              <Button size="icon" variant="secondary" onClick={handleAddMantra} ref={submitButtonRef}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </span>
          </AnimateUnmount>
        </CardHeader>
        <Separator />
        <CardContent className="px-3 pb-2">
          <div className="mt-2 flex flex-col gap-1">
            {options.map((mantra) => {
              return (
                <div key={mantra} className="flex items-center justify-between">
                  <button
                    className="peer order-2 rounded p-1 text-foreground/90 hover:bg-surface hover:text-foreground"
                    onClick={() => {
                      setOptions(options.filter((option) => option !== mantra))
                    }}
                  >
                    <div className="rotate-45">
                      <PlusIcon />
                    </div>
                  </button>
                  <p className="order-1 w-4/5 overflow-hidden truncate overflow-ellipsis text-sm text-muted-foreground peer-hover:text-foreground">
                    {mantra}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
