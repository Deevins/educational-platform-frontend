import { Middleware } from 'redux'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { setUserId } from '@/utils/redux/store/authSlice.ts'

interface CustomTokenPayload extends JwtPayload {
  user_id: string
}

const token = localStorage.getItem('token')

const userMiddleware: Middleware = (store) => (next) => (action: any) => {
  // Заменяем тип action на AnyAction
  // Явно указываем тип action

  if (action.type === 'INITIALIZE_USER_ID') {
    if (token) {
      try {
        const decodedToken: CustomTokenPayload = jwtDecode(token)
        const userID = decodedToken.user_id
        console.log(decodedToken, userID)
        // Dispatch action to save user_id in Redux state
        store.dispatch(setUserId(userID))
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }

  // Pass the action to the next middleware
  return next(action)
}

export default userMiddleware
