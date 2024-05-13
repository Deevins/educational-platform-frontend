import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/utils/redux/store/rootReducer.ts'
import userMiddleware from '@/utils/redux/store/middlewares.ts'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userMiddleware), // Изменил добавление middleware
})

// Dispatch action to initialize user_id when the application starts
store.dispatch({ type: 'INITIALIZE_USER_ID' })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
