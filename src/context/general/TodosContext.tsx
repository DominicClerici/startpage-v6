import { createContext } from "react"
import useChromeStorage from "../../hooks/useChromeStorage"

export const ShowTodosContext = createContext(null)
const defaultShowTodos = true
const ShowTodosProvider = ({ children }) => {
  const [showTodos, setShowTodos] = useChromeStorage("showTodos", defaultShowTodos)
  return <ShowTodosContext.Provider value={{ showTodos, setShowTodos }}>{children}</ShowTodosContext.Provider>
}

export const OpenTodosContext = createContext(null)
const defaultOpenTodos = false
const OpenTodosProvider = ({ children }) => {
  const [openTodos, setOpenTodos] = useChromeStorage("openTodos", defaultOpenTodos)
  return <OpenTodosContext.Provider value={{ openTodos, setOpenTodos }}>{children}</OpenTodosContext.Provider>
}

export const TodosContext = createContext(null)
const defaultTodos = [
  { text: "Set username", completed: false, createdAt: Date.now() },
  { text: "Set weather location", completed: true, createdAt: Date.now() + 1 },
  { text: "Create more todos", completed: false, createdAt: Date.now() + 3 },
]
// will be objects with {text: string, completed: boolean, createdAt: number}
const TodoListProvider = ({ children }) => {
  const [todos, setTodos] = useChromeStorage("todos", defaultTodos)
  return <TodosContext.Provider value={{ todos, setTodos }}>{children}</TodosContext.Provider>
}

export const TodosProvider = ({ children }) => {
  return (
    <ShowTodosProvider>
      <OpenTodosProvider>
        <TodoListProvider>{children}</TodoListProvider>
      </OpenTodosProvider>
    </ShowTodosProvider>
  )
}
