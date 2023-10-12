import {configureStore} from "@reduxjs/toolkit"
import themeSlice from "./themeSlice"
import modalSlice from "./modalSlice"
import todosSlice from "./todosSlice"
import notificationSlice from "./notificationSlice"

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    theme: themeSlice,
    modal: modalSlice,
    notification: notificationSlice
  }
})
