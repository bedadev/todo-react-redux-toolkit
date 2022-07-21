import React, { useRef, useState } from "react"
import {
  Todo as TodoType,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../features/todoApiSlice"

const Todo = () => {
  const [newTodo, setNewTodo] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [todoEdit, setTodoEdit] = useState({} as TodoType)
  const { data: todos = [], isFetching, error } = useGetTodosQuery(20)
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newTodo) {
      if (isEdit) {
        updateTodo({ ...todoEdit, title: newTodo })
        setIsEdit(false)
        setTodoEdit({} as TodoType)
      } else {
        addTodo({ title: newTodo, completed: false, userId: 1 })
      }
    }
    setNewTodo("")
  }

  const onEdit = (todo: TodoType) => {
    setIsEdit(true)
    setNewTodo(todo.title)
    setTodoEdit(todo)
    inputRef.current?.focus()
  }

  // const dropdown = useRef<HTMLDivElement>(null)
  // const handleClick = () => {
  //   dropdown?.current?.classList.toggle("dropdown-open")
  //   if (document.activeElement instanceof HTMLElement) {
  //     document.activeElement.blur()
  //   }
  // }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-6">TODO</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input input-bordered w-full"
              ref={inputRef}
            />
            <button type="submit" className="btn btn-square">
              {isEdit ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </form>
      <div className="overflow-x-auto w-full">
        <table className="table w-full h-full overflow-hidden">
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <th>
                  <input
                    id={String(todo.id)}
                    type="checkbox"
                    checked={todo.completed}
                    className="checkbox checkbox-primary checkbox-sm "
                    onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                  />
                </th>
                <td className="flex items-start h-full">
                  <p
                    className={`whitespace-pre-wrap ${
                      todo.completed ? "line-through font-normal" : "font-semibold "
                    } `}
                  >
                    {todo.title}
                  </p>
                </td>

                <th>
                  <div className="dropdown dropdown-end float-right">
                    <label tabIndex={0} className="btn btn-ghost btn-xs m-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a
                          onClick={() => {
                            onEdit(todo)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>{" "}
                          Edit
                        </a>
                      </li>
                      <li>
                        <a onClick={() => deleteTodo({ id: todo.id })}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>{" "}
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Todo
