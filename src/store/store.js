import { configureStore } from '@reduxjs/toolkit'
import user from './features/userSlice'
import form from './features/formSlice'

export const store = configureStore({
  reducer: {
    user,
    form,
  },
})