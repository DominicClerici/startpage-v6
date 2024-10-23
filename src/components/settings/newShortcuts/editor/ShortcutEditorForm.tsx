import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { shortcutsContext, ShortcutType } from "@/context/shortcuts/Shortcuts"
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import IconControl from "./IconControl"
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react"
import LucideRender from "@/components/ui/lucideRender"
import ColorSelector from "./ColorSelector"
import { colorMap } from "@/components/lib/colorMap"
import WebPhotoRender from "@/components/ui/webPhotoRender"
import { Button } from "@/components/ui/button"
import { generateUuid } from "@/lib/utils"

const shortcutSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  url: z.string().url().min(1, "URL is required"),
  icon: z.string(),
  customIcon: z.boolean(),
  color: z.string(),
})
type ShortcutSchemaType = z.infer<typeof shortcutSchema>
export type UseFormShortcutType = ReturnType<typeof useForm>

const ShortcutEditorForm = ({
  shortcut,
  isCreating,
  setListState,
}: {
  shortcut?: ShortcutType
  isCreating?: boolean
  setListState: Dispatch<SetStateAction<{ shortcuts: ShortcutType[] }>>
}) => {
  const defaults = isCreating
    ? {
        name: "",
        url: "",
        icon: "link",
        customIcon: false,
        color: "red",
      }
    : {
        name: shortcut.name,
        url: shortcut.url,
        icon: shortcut.icon,
        customIcon: shortcut.customIcon,
        color: "red",
      }
  const [shortcutPreviewData, setShortcutPreviewData] = useState(defaults)
  const { setShortcuts } = useContext(shortcutsContext)
  const closeRef = useRef<HTMLButtonElement>(null)

  const form = useForm<ShortcutSchemaType>({
    resolver: zodResolver(shortcutSchema),
    defaultValues: defaults,
  })

  const updatePreview = () => {
    const { name, url, icon, customIcon, color } = form.getValues()
    setShortcutPreviewData({ name, url, icon, customIcon, color })
  }

  const onSubmit = (values: ShortcutSchemaType) => {
    setListState(({ shortcuts }) => {
      if (isCreating) {
        return {
          shortcuts: [
            {
              name: values.name,
              url: values.url,
              icon: values.icon,
              customIcon: values.customIcon,
              color: values.color,
              type: "shortcut",
              id: generateUuid(),
              useCount: 0,
              order: 0,
            },
            ...shortcuts,
          ],
        }
      } else {
        return {
          shortcuts: shortcuts.map((s) => {
            if (s.id === shortcut.id) {
              return {
                name: values.name,
                url: values.url,
                icon: values.icon,
                customIcon: values.customIcon,
                color: values.color,
                id: s.id,
                useCount: s.useCount,
                order: s.order,
                type: s.type,
              }
            } else {
              return s
            }
          }),
        }
      }
    })

    setShortcuts((shortcuts) => {
      if (isCreating) {
        return [
          {
            name: values.name!,
            url: values.url!,
            icon: values.icon!,
            customIcon: values.customIcon!,
            color: values.color!,
            type: "shortcut" as "shortcut" | "folder",
            id: generateUuid(),
            useCount: 0,
            order: 0,
          },
          ...shortcuts,
        ]
      } else {
        return shortcuts.map((s) => {
          if (s.id === shortcut.id) {
            return {
              name: values.name!,
              url: values.url!,
              icon: values.icon!,
              customIcon: values.customIcon!,
              color: values.color!,
              id: s.id,
              useCount: s.useCount,
              order: s.order,
              type: s.type,
            }
          } else {
            return s
          }
        })
      }
    })
    if (closeRef.current) closeRef.current.click()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isCreating ? "Add new shortcut" : `Edit ${shortcut.name}`}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <ShortcutPreview data={shortcutPreviewData} />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Shortcut Title</FormLabel>
                <FormControl>
                  <Input onBlur={updatePreview} {...field} placeholder="Portfolio website" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://www.dominicclerici.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <IconControl updatePreview={updatePreview} form={form} />
          <ColorSelector updatePreview={updatePreview} form={form} />
          <div className="flex items-center justify-between gap-4">
            <DialogClose asChild>
              <Button variant="outline" ref={closeRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ShortcutEditorForm

interface ShortcutPreviewProps {
  data: ShortcutSchemaType
}

const ShortcutPreview = ({ data }: ShortcutPreviewProps) => {
  const [h, s, l] = colorMap[data.color]
  return (
    <div className="flex justify-center">
      <div
        style={{
          backgroundColor: `hsla(${h}, ${s}%, ${l}%, 0.2)`,
        }}
        className="flex h-24 w-24 flex-col items-center rounded bg-white/40 p-2"
      >
        {data.customIcon ? (
          <LucideRender
            style={{
              color: `hsla(${h}, ${s}%, ${l + 10}%, 1)`,
            }}
            name={data.icon}
            className="h-10 w-10"
          />
        ) : (
          <WebPhotoRender url={data.url} className="h-10 w-10" size={64} />
        )}
        <p
          style={{
            color: `hsla(${h}, ${s}%, ${l + 15}%, 1)`,
          }}
          className="my-auto line-clamp-2 overflow-ellipsis text-center text-sm font-light leading-tight"
        >
          {data.name}
        </p>
      </div>
    </div>
  )
}
