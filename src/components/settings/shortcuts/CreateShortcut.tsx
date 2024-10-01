import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { generateUuid } from "@/lib/utils"
import { hasProtocol, isValidUrl } from "@/utils/isValidURL"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const schema = z.object({
  name: z.string().min(1, "Name required").max(20, "Max 20 characters"),
  url: z.string().min(1, "URL required"),
})
export default function CreateShortcut({ cancel }: { cancel: () => void }) {
  const [showUrlWarning, setShowUrlWarning] = useState(false)
  const { shortcuts, setShortcuts } = useContext(shortcutsContext)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      url: "",
    },
  })
  const onSubmit = (values: { name: string; url: string }) => {
    const isValid = isValidUrl(values.url)
    if (!isValid) {
      setShowUrlWarning(true)
      return
    }
    finishSubmit(values.name, values.url)
  }
  const finishSubmit = (name: string, url: string) => {
    setShortcuts([{ name, url: hasProtocol(url) ? url : `//${url}`, id: generateUuid(), useCount: 0 }, ...shortcuts])
    cancel()
  }

  // useeffect to handle user pressing enter submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        form.handleSubmit(onSubmit)()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [form, onSubmit])

  return (
    <AlertDialog open={showUrlWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your URL seems to be invalid</AlertDialogTitle>
          <AlertDialogDescription>Your shortcut may not work as expected.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.preventDefault()
              setShowUrlWarning(false)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              setShowUrlWarning(false)
              finishSubmit(form.getValues("name"), form.getValues("url"))
            }}
          >
            Add anyways
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
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
              tabIndex={-1}
              variant="secondary"
              className="flex-grow-0"
              onClick={(e) => {
                e.preventDefault()
                cancel()
              }}
            >
              Cancel
            </Button>
            <Button tabIndex={0} className="flex-grow">
              Create
            </Button>
          </span>
        </form>
      </Form>
    </AlertDialog>
  )
}
