import { OpenTodosContext, ShowTodosContext } from "../../../../context/general/TodosContext"
import Toggle from "../../controls/Toggle"

export default function TodoSettings() {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="showTodos" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Show todos</h2>
        </span>
        <Toggle htmlFor="showTodos" ctx={ShowTodosContext} />
      </label>
      <label htmlFor="openTodos" className="flex items-center justify-between">
        <span>
          <h2 className="text-lg">Open by default</h2>
          <h3 className="text-muted-foreground">Have your todos already open on your new tab</h3>
        </span>
        <Toggle htmlFor="openTodos" ctx={OpenTodosContext} />
      </label>
    </div>
  )
}
