import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  filterValue: '1'
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: (state, action) => {
      state.todos.unshift(action.payload)
    },
    updateTodo: (state, action) => {
      const { todoId, title, body } = action.payload
      const currentTodo = state.todos.find(todo => todo.id === todoId)
      if (currentTodo) {
        currentTodo.title = title
        currentTodo.body = body
      }
    },
    deleteTodo: (state, action) => {
      const taskId = action.payload
      state.todos = state.todos.filter(todo => todo.id !== taskId)
    },

    changeTaskStatus: (state, action) => {
      const { todoId, status } = action.payload
      const currentTodo = state.todos.find(todo => todo.id === todoId)
      if (currentTodo) {
        currentTodo.completed = status
      }
    },

    setFilterValue: (state, action) => {
      state.filterValue = action.payload
    },
  },
})

export const {
  createTodo,
  updateTodo,
  changeTaskStatus,
  deleteTodo,
  setFilterValue
} = todosSlice.actions

export default todosSlice.reducer
