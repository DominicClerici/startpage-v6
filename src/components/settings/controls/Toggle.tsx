import { Switch } from "@/components/ui/switch"
import { useContext } from "react"

const Toggle = ({ htmlFor, ctx, disabled }: { htmlFor: string; ctx: any; disabled?: boolean }) => {
  const ctxt = useContext(ctx)
  const vals = Object.values(ctxt)
  return <Switch disabled={disabled} id={htmlFor} checked={vals[0]} onCheckedChange={(e) => vals[1](e)} />
}

export default Toggle
