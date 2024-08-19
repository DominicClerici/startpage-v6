import { useContext, useRef, useState } from "react"
import { MantraOptionsContext, MantrasCurated } from "../../../../context/general/GreetingContext"
import Toggle from "../../controls/Toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimateUnmount from "@/components/lib/AnimateUnmount"
import { Separator } from "@/components/ui/separator"

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
    if (options.length >= 500) {
      setError("500 max mantras")
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
      {/* <label htmlFor="mantrasCurated" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Include curated mantras</h2>
          <h3 className="text-muted-foreground">1000+ curated mantras mixed in with yours</h3>
        </span>
        <Toggle htmlFor="mantrasCurated" ctx={MantrasCurated} />
      </label> */}
      <Card className="rounded-lg border bg-card">
        <CardHeader className="gap-2 p-4">
          <div className="flex flex-row justify-between">
            <span>
              <CardTitle>Custom mantras</CardTitle>
              <CardDescription>Add your own mantras into the mix</CardDescription>
              {error && <p className="my-1 animate-[fadeScaleIn_.2s_ease-out] text-destructive">{error}</p>}
            </span>
            <Button
              onClick={() => {
                setIsAdding(!isAdding)
                setError(null)
              }}
              variant="secondary"
            >
              {isAdding ? "Cancel" : "Add custom mantra"}
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
        <CardContent className="p-4 pb-2 pt-0">
          <div className="mt-2 flex flex-col gap-2">
            {options.map((mantra) => {
              return (
                <div key={mantra} className="flex items-center justify-between">
                  <button
                    className="peer order-2 rounded p-2 text-main/90 hover:bg-surface hover:text-main"
                    onClick={() => {
                      setOptions(options.filter((option) => option !== mantra))
                    }}
                  >
                    <div className="rotate-45">
                      <PlusIcon />
                    </div>
                  </button>
                  <p className="order-1 w-4/5 overflow-hidden truncate overflow-ellipsis text-lg text-main/80 peer-hover:text-main">
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
