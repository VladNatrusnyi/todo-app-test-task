import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    isSendFromModal: false,
    modalSettingData: null
  },
  reducers: {
    setModalShow: (state, action) => {
      if ( action.payload.actionType) {
        state.modalSettingData = action.payload.actionType
      }
      state.modalShow = action.payload.isOpen
    },
    clearModal: (state, action) => {
      state.modalSettingData = null
      state.modalShow = false
    },
    setIsSendFromModal: (state, action) => {
      state.isSendFromModal = action.payload
    },
  },
})

export const {
  setModalShow,
  setIsSendFromModal,
  clearModal
} = modalSlice.actions
export default modalSlice.reducer
