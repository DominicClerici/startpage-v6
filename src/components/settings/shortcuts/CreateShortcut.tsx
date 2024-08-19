import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { generateUuid } from "@/lib/utils"

const schema = z.object({
  name: z.string().min(1, "Name required").max(20, "Max 20 characters"),
  url: z.string().min(1, "URL required"),
})
export default function CreateShortcut({ cancel }: { cancel: () => void }) {
  const { shortcuts, setShortcuts } = useContext(shortcutsContext)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      url: "",
    },
  })
  const onSubmit = (values: z.infer<typeof schema>) => {
    setShortcuts([{ ...values, id: generateUuid(), useCount: 0 }, ...shortcuts])
    cancel()
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
        <span className="mt-4 flex items-center gap-4">
          <Button
            variant="secondary"
            className="flex-grow-0"
            onClick={(e) => {
              e.preventDefault()
              cancel()
            }}
          >
            Cancel
          </Button>
          <Button className="flex-grow">Create</Button>
        </span>
      </form>
    </Form>
  )
}
