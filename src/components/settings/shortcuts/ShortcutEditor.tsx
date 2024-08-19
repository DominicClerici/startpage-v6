import AnimateUnmount from "@/components/lib/AnimateUnmount"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { shortcutsContext } from "@/context/shortcuts/Shortcuts"
import { ListOrdered, PencilLine, PlusIcon, TrashIcon } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import CreateShortcut from "./CreateShortcut"
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers"

import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import EditShortcut from "./EditShortcut"

export default function ShortcutEditor() {
  const { shortcuts, setShortcuts } = useContext(shortcutsContext)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsCreating(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setShortcuts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardHeader className="space-y-0">
          <span className="flex flex-row items-start justify-between">
            <CardTitle>Shortcuts</CardTitle>
            <span className="mt-0 flex flex-row items-center gap-1">
              <Button variant="outline" className="items-center gap-2" onClick={() => setIsCreating(!isCreating)}>
                <PlusIcon className={`h-4 w-4 transition-transform ${isCreating ? "rotate-45" : "rotate-0"}`} />
                {isCreating ? "Cancel" : "Create"}
              </Button>
            </span>
          </span>
          <AnimateUnmount active={isCreating}>
            <CreateShortcut cancel={() => setIsCreating(false)} />
          </AnimateUnmount>
        </CardHeader>
        <CardContent>
          <SortableContext items={shortcuts} strategy={verticalListSortingStrategy}>
            {shortcuts.map((shortcut) => (
              <SortableShortcutItem key={shortcut.id} shortcut={shortcut} />
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  )
}

type ShortcutItemProps = {
  shortcut: {
    id: string
    name: string
    url: string
  }
}

const SortableShortcutItem = ({ shortcut }: ShortcutItemProps) => {
  const { shortcuts, setShortcuts } = useContext(shortcutsContext)
  const [isOpen, setIsOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: shortcut.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const deleteShortcut = () => {
    setShortcuts(shortcuts.filter((item) => item.id !== shortcut.id))
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={`grid cursor-default grid-cols-3 p-1`}>
      <span>{shortcut.name}</span>
      <span>{shortcut.url}</span>
      <span className="flex justify-end gap-1">
        <Button {...listeners} variant="ghost" size="icon">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <PencilLine className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Shortcut</DialogTitle>
            </DialogHeader>
            <EditShortcut setIsOpen={setIsOpen} shortcut={shortcut} setShortcuts={setShortcuts} />
          </DialogContent>
        </Dialog>
        <Button onClick={deleteShortcut} variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </span>
    </div>
  )
}
