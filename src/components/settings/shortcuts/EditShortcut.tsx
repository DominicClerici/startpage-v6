import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Name required").max(20, "Max 20 characters"),
  url: z.string().min(1, "URL required"),
})

type EditShortcutProps = {
  setIsOpen: (isOpen: boolean) => void
  shortcut: {
    id: string
    name: string
    url: string
  }
  setShortcuts: (shortcuts: any) => void
}

export default function EditShortcut({ setIsOpen, shortcut, setShortcuts }: EditShortcutProps) {
  const { shortcuts } = useContext(shortcutsContext)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: shortcut.name,
      url: shortcut.url,
    },
  })
  const onSubmit = (values: z.infer<typeof schema>) => {
    setShortcuts(shortcuts.map((item) => (item.id === shortcut.id ? { ...values, id: shortcut.id } : item)))
    setIsOpen(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Portfolio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="dominicclerici.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-4 flex items-center gap-4">
          <DialogClose asChild>
            <Button variant="secondary" className="flex-grow-0">
              Cancel
            </Button>
          </DialogClose>
          <Button className="flex-grow" type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
