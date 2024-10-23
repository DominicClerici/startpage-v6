import React, { useState, useMemo, useRef } from "react"
import { FixedSizeGrid } from "react-window"
import { Input } from "@/components/ui/input"
import { iconKeys } from "./iconKeys"
import fuzzysort from "fuzzysort"
import { UseFormShortcutType } from "./ShortcutEditorForm"
import LucideRender from "@/components/ui/lucideRender"

const COLUMN_COUNT = 4
const CELL_SIZE = 70

export default function IconBrowser({ form, updatePreview }: { form: UseFormShortcutType; updatePreview: () => void }) {
  const input = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const timeoutDebounce = useRef(null)

  const filteredIcons = useMemo(() => {
    if (searchTerm.trim().length > 0) {
      return fuzzysort.go(searchTerm, iconKeys).map((r) => r.target)
    } else {
      return iconKeys
    }
  }, [searchTerm])

  const ROW_COUNT = Math.ceil(filteredIcons.length / COLUMN_COUNT)

  const IconCell = React.memo(
    ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
      const index = rowIndex * COLUMN_COUNT + columnIndex
      const iconName = filteredIcons[index]

      if (!iconName) return null

      return (
        <div style={style}>
          <div
            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded border hover:bg-hover`}
            onClick={() => {
              form.setValue("icon", iconName)
              console.log(iconName)
              updatePreview()
            }}
          >
            <LucideRender name={iconName} />
          </div>
        </div>
      )
    },
  )

  return (
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold">Select an Icon</h3>
      <Input
        type="text"
        placeholder="Search icons..."
        ref={input}
        onChange={(e) => {
          const value = e.target.value.trim()
          if (value === "") {
            setSearchTerm("")
            return
          }
          // debounce by 150ms
          if (timeoutDebounce.current) {
            clearTimeout(timeoutDebounce.current)
          }
          timeoutDebounce.current = setTimeout(() => {
            setSearchTerm(e.target.value)
          }, 150)
        }}
        className="mb-4"
      />
      <FixedSizeGrid
        className="customScrollBar"
        columnCount={COLUMN_COUNT}
        columnWidth={CELL_SIZE}
        height={320}
        rowCount={ROW_COUNT}
        rowHeight={CELL_SIZE}
        width={CELL_SIZE * COLUMN_COUNT + 10}
      >
        {IconCell}
      </FixedSizeGrid>
    </div>
  )
}
