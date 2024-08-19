import { useContext, useState } from "react"
import "./todos.css"
import Content from "./Content"
import { OpenTodosContext, ShowTodosContext } from "../../context/general/TodosContext"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ListChecksIcon } from "lucide-react"

// const TodoIconSVG = ({ isOpen }: { isOpen: boolean }) => {
//   return (
//     <svg
//       className="h-12 w-12 transition-colors duration-75 group-hover:text-foreground"
//       stroke="currentColor"
//       fill="none"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//       strokeLinejoin="round"
//       strokeLinecap="round"
//       height="200px"
//       width="200px"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         className={`transition-opacity ${isOpen ? "duration-75" : "delay-150 duration-200"}`}
//         opacity={isOpen ? "0" : "1"}
//         x="3"
//         y="5"
//         width="6"
//         height="6"
//         rx="1"
//       ></rect>
//       <path
//         className="customTransitionRule"
//         d={isOpen ? "m4 4 16 16 -8 -8 8 -8 -16 16" : "m3 17 2 2 0  0 0  0 4 -4"}
//       ></path>
//       <path
//         className={`transition-opacity ${isOpen ? "duration-75" : "delay-150 duration-200"}`}
//         opacity={isOpen ? "0" : "1"}
//         d="M13 6h8"
//       ></path>
//       <path
//         className={`transition-opacity ${isOpen ? "duration-75" : "delay-150 duration-200"}`}
//         opacity={isOpen ? "0" : "1"}
//         d="M13 12h8"
//       ></path>
//       <path
//         className={`transition-opacity ${isOpen ? "duration-75" : "delay-150 duration-200"}`}
//         opacity={isOpen ? "0" : "1"}
//         d="M13 18h8"
//       ></path>
//     </svg>
//   )
// }

export default function Todos() {
  const { showTodos } = useContext(ShowTodosContext)
  if (!showTodos) return <></>
  const { openTodos } = useContext(OpenTodosContext)
  const [isOpen, setIsOpen] = useState(openTodos)

  return (
    <Popover onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={`${isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"} group cursor-pointer rounded-lg p-2 transition-colors`}
      >
        <ListChecksIcon
          className={`h-12 w-12 transition-transform ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[60%] group-hover:translate-y-1 group-hover:scale-[70%]"}`}
        />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        sideOffset={8}
        collisionPadding={16}
        className="w-auto p-3"
      >
        <Content />
      </PopoverContent>
    </Popover>
  )
}
