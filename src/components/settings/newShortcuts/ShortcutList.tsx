import { shortcutsContext, ShortcutType } from "@/context/shortcuts/Shortcuts"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ShortcutEditorForm from "./editor/ShortcutEditorForm"
import { PencilLineIcon, Trash2Icon, TrashIcon, XIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { colorMap } from "@/components/lib/colorMap"
import LucideRender from "@/components/ui/lucideRender"
import WebPhotoRender from "@/components/ui/webPhotoRender"
import { Input } from "@/components/ui/input"
import fuzzysort from "fuzzysort"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default function ShortcutList() {
  const { shortcuts, setShortcuts } = useContext(shortcutsContext)
  const [listState, setListState] = useState({ shortcuts: shortcuts })
  const [search, setSearch] = useState("")

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    if (e.target.value.trim().length >= 1) {
      const results = fuzzysort.go(e.target.value, shortcuts, {
        keys: ["name"],
        threshold: -10000,
      })
      setListState({ shortcuts: results.map((r) => r.obj) })
    } else {
      setListState({ shortcuts: shortcuts })
    }
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const newShortcuts = reorder(listState.shortcuts, result.source.index, result.destination.index) as ShortcutType[]

    setListState({ shortcuts: newShortcuts })
  }

  return (
    <div className="pb-8">
      <Separator className="my-4" />
      <h1 className="text-2xl">{shortcuts.length} Shortcuts</h1>
      <div className="mb-4 mt-2 flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Add shortcut</Button>
          </DialogTrigger>
          <DialogContent>
            <ShortcutEditorForm isCreating={true} setListState={setListState} />
          </DialogContent>
        </Dialog>
        <Input placeholder="Search shortcuts" value={search} onChange={handleSearchChange} />

        <AlertDialog>
          <Tooltip>
            <AlertDialogTrigger>
              <TooltipTrigger asChild>
                <Button variant="destructive" className="flex-shrink-0" size="icon">
                  <Trash2Icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
            </AlertDialogTrigger>
            <TooltipContent>Clear all shortcuts</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all of your shortcuts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShortcuts([])
                  setListState({ shortcuts: [] })
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="vertical" droppableId="list">
          {(provided) => (
            <div className="flex flex-col" ref={provided.innerRef} {...provided.droppableProps}>
              {listState.shortcuts.map((shortcut, i) => (
                <Draggable key={shortcut.id} draggableId={shortcut.id} index={i}>
                  {(provided, snapshot) => (
                    <ShortcutItem
                      setShortcuts={setShortcuts}
                      setListState={setListState}
                      snapshot={snapshot}
                      shortcut={shortcut}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

interface ShortcutItemProps {
  shortcut: ShortcutType
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  setListState: Dispatch<SetStateAction<{ shortcuts: ShortcutType[] }>>
  setShortcuts: Dispatch<SetStateAction<ShortcutType[]>>
}

const HandleSVG = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  )
}

const ShortcutItem = ({ shortcut, provided, snapshot, setShortcuts, setListState }: ShortcutItemProps) => {
  const [h, s, l] = colorMap[shortcut.color]
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="my-1 flex items-center rounded border bg-page py-1 pl-2 pr-1"
    >
      <div
        style={{
          backgroundColor: `hsla(${h}, ${s}%, ${l}%, 0.2)`,
        }}
        className="mr-1.5 flex h-7 w-7 flex-col items-center justify-center rounded bg-white/40"
      >
        {shortcut.customIcon ? (
          <LucideRender
            style={{
              color: `hsla(${h}, ${s}%, ${l + 10}%, 1)`,
            }}
            name={shortcut.icon}
            className="h-4 w-4"
          />
        ) : (
          <WebPhotoRender url={shortcut.url} className="h-4 w-4" size={16} />
        )}
      </div>
      <p> {shortcut.name}</p>
      <AlertDialog>
        <Tooltip>
          <AlertDialogTrigger className="ml-auto">
            <TooltipTrigger asChild>
              <div className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <TrashIcon className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Delete shortcut</TooltipContent>
          </AlertDialogTrigger>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all of your shortcuts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShortcuts((shortcuts) => {
                  const n = shortcuts.filter((s) => s.id !== shortcut.id)
                  setListState({ shortcuts: n })
                  return n
                })
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog>
        <Tooltip>
          <DialogTrigger>
            <TooltipTrigger asChild>
              <div className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <PencilLineIcon className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Edit shortcut</TooltipContent>
          </DialogTrigger>
        </Tooltip>
        <DialogContent>
          <ShortcutEditorForm shortcut={shortcut} setListState={setListState} />
        </DialogContent>
      </Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group rounded-md p-2 hover:bg-hover" {...provided.dragHandleProps} tabIndex={-1}>
            <HandleSVG className="h-6 w-6 outline-none transition-transform duration-75 group-active:scale-y-75" />
          </div>
        </TooltipTrigger>
        <TooltipContent>Drag to reorder</TooltipContent>
      </Tooltip>
    </div>
  )
}
