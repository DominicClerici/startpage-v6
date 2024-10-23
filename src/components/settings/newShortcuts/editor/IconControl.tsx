import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { UseFormShortcutType } from "./ShortcutEditorForm"
import IconBrowser from "./IconBrowser"

const IconControl = ({ form, updatePreview }: { form: UseFormShortcutType; updatePreview: () => void }) => {
  const customEnabled = form.watch("customIcon")

  return (
    <>
      <FormField
        control={form.control}
        name="customIcon"
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center">
            <div className="col-span-3 flex flex-col gap-1 pr-4">
              <FormLabel>Use custom icon</FormLabel>
              <FormDescription>If disabled, the websites default favicon will be displayed</FormDescription>
              <FormMessage />
            </div>

            <FormControl className="justify-self-end">
              <Switch
                checked={field.value}
                onCheckedChange={(e) => {
                  field.onChange(e)
                  updatePreview()
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {customEnabled && (
        <FormField
          control={form.control}
          name="icon"
          render={() => (
            <FormItem className="grid grid-cols-3 items-center">
              <div className="col-span-2 flex flex-col gap-1 pr-4">
                <FormLabel>Choose your icon</FormLabel>
                <FormDescription>All icons sourced from lucide.dev</FormDescription>
                <FormMessage />
              </div>
              <Popover>
                <PopoverTrigger asChild className="justify-self-stretch">
                  <Button variant="outline" className="w-full">
                    Select icon
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="relative z-50 rounded-md border bg-popover">
                  <IconBrowser updatePreview={updatePreview} form={form} />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      )}
    </>
  )
}

export default IconControl
