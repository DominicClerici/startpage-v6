import { useContext } from "react"
import { BackgroundMode } from "../../../../context/appearance/Appearance"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AuraSettings from "./AuraSettings"
import SolidSettings from "./SolidSettings"
import AnimateUnmount from "@/components/lib/AnimateUnmount"

export default function BackgroundSelector() {
  const { backgroundMode, setBackgroundMode } = useContext(BackgroundMode)
  return (
    <>
      <label className="mb-4 grid grid-cols-3 items-center gap-8">
        <span className="col-span-2">
          <h2 className="text-lg">Background type</h2>
        </span>
        <Select value={backgroundMode} onValueChange={setBackgroundMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Colors</SelectLabel>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="aura">Aura</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Coming soon</SelectLabel>
              <SelectItem disabled value="upload">
                Upload
              </SelectItem>
              <SelectItem disabled value="unsplash">
                Unsplash
              </SelectItem>
              <SelectItem disabled value="unsplash">
                Dot Matrix
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
      <AnimateUnmount closeDuration="0ms" active={backgroundMode === "aura"}>
        <AuraSettings />
      </AnimateUnmount>
      <AnimateUnmount closeDuration="0ms" active={backgroundMode === "solid"}>
        <SolidSettings />
      </AnimateUnmount>
    </>
  )
}
