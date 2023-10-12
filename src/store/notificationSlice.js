import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationData: null
  },
  reducers: {
    setNotificationData: (state, action) => {
      state.notificationData = action.payload
    },
  },
})

export const { setNotificationData } = notificationSlice.actions
export default notificationSlice.reducer
