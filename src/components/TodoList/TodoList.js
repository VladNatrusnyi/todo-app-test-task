import {TodoCard} from "../TodoCard/TodoCard"


export const TodoList = ({todos, notFoundText}) => {
  return (
    <>
      {
        todos && todos.length
        ? todos.map(todo => {
          return <TodoCard key={todo.id} todoData={todo}/>
          })
          : <div className="text-center">{notFoundText}</div>
      }
    </>
  )
}
