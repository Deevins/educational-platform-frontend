import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/utils/redux/store/store.ts'

interface AuthState {
  token: string | null
  userId: string | null
  error: string | null
  isLoggedIn: boolean
  status: 'idle' | 'loading' | 'failed'
}

interface RegisterUserData {
  email: string
  password: string
  full_name: string
  phone_number: string
}

interface RegisterUserResponse {
  token: string
  userId: string // Предположим, что это строковое представление айди пользователя
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: null,
  error: null,
  isLoggedIn: localStorage.getItem('token') !== null,
  status: 'idle',
}

// Создание Thunk для входа в систему
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

      const data: { token: string; user_id: string } = await response.json()
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message)
    }
  }
)

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

      const data: RegisterUserResponse = await response.json()
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null
      state.userId = null
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.userId = action.payload.user_id
        console.log(action.payload.token, action.payload.user_id)
        state.isLoggedIn = true
        state.status = 'idle'
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading'
      })
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.isLoggedIn = action.payload.token !== null
        state.userId = action.payload.userId
        state.error = null
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(logout, (state) => {
        state.token = null
        state.isLoggedIn = false
        state.userId = null
        state.status = 'idle'
        localStorage.removeItem('token')
      })

    builder.addCase(setUserId, (state, action) => {
      state.userId = action.payload
    })
  },
})
// daker2544@mail.ru qweqwe123123
export const { clearToken } = authSlice.actions

export const setUserId = createAction<string>('user/setUserId')
export const selectIsAuthenticated = (state: RootState) => state.auth.isLoggedIn
export const logout = createAction('auth/logout')

export default authSlice.reducer
