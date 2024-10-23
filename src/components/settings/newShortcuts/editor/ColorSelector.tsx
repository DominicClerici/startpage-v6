import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormShortcutType } from "./ShortcutEditorForm"
import { RadioGroup } from "@/components/ui/radio-group"
import { RadioGroupItem } from "@radix-ui/react-radio-group"
import { colorMap } from "@/components/lib/colorMap"

export default function ColorSelector({
  updatePreview,
  form,
}: {
  updatePreview: () => void
  form: UseFormShortcutType
}) {
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Color</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(e) => {
                field.onChange(e)
                updatePreview()
              }}
              defaultValue={field.value}
              className="flex items-center gap-2 space-x-0 space-y-0"
            >
              <ColorOption value="white" />
              <ColorOption value="light" />
              <ColorOption value="gray" />
              <ColorOption value="dark" />
              <ColorOption value="red" />
              <ColorOption value="orange" />
              <ColorOption value="yellow" />
              <ColorOption value="green" />
              <ColorOption value="blue" />
              <ColorOption value="purple" />
              <ColorOption value="pink" />
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const ColorOption = ({ value }: { value: string }) => {
  const [h, s, l] = colorMap[value]
  return (
    <FormItem>
      <RadioGroupItem
        value={value}
        className="h-8 w-8 rounded-full border-2 border-transparent bg-white transition-colors data-[state='checked']:border-white"
        style={{ backgroundColor: `hsla(${h}, ${s}%, ${l}%, 1)` }}
      />
    </FormItem>
  )
}
