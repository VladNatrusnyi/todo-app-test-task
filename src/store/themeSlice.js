import { createSlice } from '@reduxjs/toolkit'

const themeInitialState = localStorage.getItem('theme') || 'light'

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem('theme', action.payload)
      return action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
