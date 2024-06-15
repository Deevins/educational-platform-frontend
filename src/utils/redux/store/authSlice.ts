import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/utils/redux/store/store.ts'

interface AuthState {
  token: string | null
  userId: string | null
  error: string | null
  role: string | null
  isLoggedIn: boolean
  status: 'ready' | 'loading' | 'failed'
}

interface RegisterUserData {
  email: string
  password: string
  full_name: string
  phone_number: string
}

interface RegisterUserResponse {
  token: string
  userId: string
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: null,
  error: null,
  role: null,
  isLoggedIn: localStorage.getItem('token') !== null,
  status: 'ready',
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

      const data: { token: string; user_id: string; role: string } = await response.json()
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error)
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
      console.log(response)

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
      state.role = null
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.token = action.payload.token
        state.userId = action.payload.user_id
        state.role = action.payload.role
        state.isLoggedIn = true
        state.status = 'ready'
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
        state.status = 'ready'
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(logout, (state) => {
        state.token = null
        state.isLoggedIn = false
        state.userId = null
        state.status = 'ready'
        localStorage.removeItem('token')
      })

    builder.addCase(setUserId, (state, action) => {
      state.userId = action.payload
    })
    builder.addCase(setUserRole, (state, action) => {
      state.role = action.payload
    })
  },
})

export const setUserId = createAction<string>('user/setUserId')
export const setUserRole = createAction<string>('user/setUserRole')

export const selectIsAuthenticated = (state: RootState) => state.auth.isLoggedIn
export const selectUserID = (state: RootState) => state.auth.userId
export const selectRole = (state: RootState) => state.auth.role
export const logout = createAction('auth/logout')

export default authSlice.reducer
