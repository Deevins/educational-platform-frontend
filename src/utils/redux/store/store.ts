import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/utils/redux/store/rootReducer.ts'

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store