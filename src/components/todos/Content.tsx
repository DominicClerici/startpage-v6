import { useContext, useRef, useState } from "react"
import { TodosContext } from "../../context/general/TodosContext"
import AnimateUnmount from "../lib/AnimateUnmount"
import { Button } from "../ui/button"
import { Plus, TriangleAlert } from "lucide-react"
import { Input } from "../ui/input"

const AnimatedCheckSVG = () => {
  return (
    <svg className="absolute h-7 w-7" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m2 5 2 2 4 -4"
        stroke="currentColor"
        strokeDasharray={10}
        strokeDashoffset={10}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dashoffset" begin={".2s"} from="10" to="0" dur=".25s" fill="freeze" />
        <animate attributeName="opacity" begin={".9s"} from="1" to="0" dur=".1s" fill="freeze" />
      </path>
    </svg>
  )
}

export default function Content() {
  const { todos, setTodos } = useContext(TodosContext)
  const [animateDoneTodos, setAnimateDoneTodos] = useState(false)
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const newTodoRef = useRef<HTMLInputElement | null>(null)

  const handleClearFinished = () => {
    setAnimateDoneTodos(true)
    setTimeout(() => {
      setTodos((prev) => {
        return prev.filter((todo) => !todo.completed)
      })
      setAnimateDoneTodos(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTodo()
    if (e.key === "Escape") {
      setIsAddingTodo(false)
      setError(null)
    }
  }

  const handleAddTodo = () => {
    if (newTodoRef.current) {
      if (!newTodoRef.current.value.trim()) {
        setError("Todo can't be empty")
        return
      }
      setError(null)
      setTodos((prev) => {
        return [
          ...prev,
          {
            text: newTodoRef.current.value,
            completed: false,
            createdAt: Date.now(),
          },
        ]
      })
      newTodoRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="flex min-w-80 items-center justify-between">
        <span className="flex items-center gap-1">
          <Button
            onClick={() => {
              setIsAddingTodo(!isAddingTodo)
              setError(null)
            }}
            size="icon"
            variant="ghost"
          >
            <Plus className={`transition-transform ${isAddingTodo ? "rotate-45" : "rotate-0"}`} />
          </Button>
          <h2 className="text-xl font-medium">Todos</h2>
        </span>

        <button
          disabled={animateDoneTodos}
          onClick={handleClearFinished}
          className="cursor-pointer rounded px-2 py-1 text-white/60 transition-colors duration-75 hover:bg-white/10 hover:text-white"
        >
          {animateDoneTodos ? (
            <>
              <span className="relative flex items-center justify-center">
                <span className="opacity-0">Remove finished</span>
                <AnimatedCheckSVG />
              </span>
            </>
          ) : (
            <span className="animate-[fadeIn_.1s]">Remove finished</span>
          )}
        </button>
      </span>
      <AnimateUnmount
        animationOpen="expandRiseFadeIn"
        closeDuration="300ms"
        animationClose="shrinkDropFadeOut"
        active={isAddingTodo}
      >
        <AddTodo handleKeyDown={handleKeyDown} newTodoRef={newTodoRef} handleAddTodo={handleAddTodo} />
      </AnimateUnmount>
      <AnimateUnmount
        animationOpen="expandRiseFadeIn"
        closeDuration="300ms"
        animationClose="shrinkDropFadeOut"
        active={typeof error === "string"}
      >
        <Error message={error} />
      </AnimateUnmount>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => {
          return (
            <Todo
              animatingOut={animateDoneTodos && todo.completed}
              key={todo.createdAt}
              {...todo}
              setCompleted={(completed) => {
                setTodos((prev) => {
                  return prev.map((t) => {
                    if (t.createdAt === todo.createdAt) {
                      return { ...t, completed }
                    }
                    return t
                  })
                })
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

const CheckmarkSVG = () => {
  return (
    <svg
      className="h-4 w-4 scale-0 transition group-has-[:checked]:scale-100"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m2 5 2 2 4 -4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const Todo = ({ text, completed, setCompleted, animatingOut }) => {
  return (
    <div
      style={{ animation: animatingOut ? "slideRightShrinkFadeOut .8s forwards" : "" }}
      className="flex items-center justify-between"
    >
      <span className={`line-clamp-1 transition-colors ${completed ? "text-white/50 line-through" : "text-white"}`}>
        {text}
      </span>
      <div className="group relative">
        <input
          className="absolute inset-0 opacity-0"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <div className="group-has-[:checked]::border-white/80 group pointer-events-none flex h-5 w-5 items-center justify-center rounded border border-white/30 text-white transition-colors group-has-[:checked]:bg-highlight">
          <CheckmarkSVG />
        </div>
      </div>
    </div>
  )
}

const Error = ({ message }) => {
  return (
    <div className="flex items-center gap-2 rounded border border-red-600 bg-red-800 p-1 px-2 py-0.5 text-red-200">
      <TriangleAlert className="h-5 w-5" />
      {message}
    </div>
  )
}

const AddTodo = ({ handleKeyDown, newTodoRef, handleAddTodo }) => {
  return (
    <span className="flex items-center gap-1">
      <Input onKeyDown={handleKeyDown} ref={newTodoRef} className="h-auto py-1" />
      <Button onClick={handleAddTodo} size="icon" variant="ghost" className="h-7">
        <Plus />
      </Button>
    </span>
  )
}
