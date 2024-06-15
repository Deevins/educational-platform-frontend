import { Middleware } from 'redux'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { setUserId, setUserRole } from '@/utils/redux/store/authSlice.ts'

interface CustomTokenPayload extends JwtPayload {
  user_id: string
  user_role: string
}

const token = localStorage.getItem('token')

const userMiddleware: Middleware = (store) => (next) => (action: any) => {
  // Заменяем тип action на AnyAction
  // Явно указываем тип action

  if (action.type === 'INITIALIZE_USER') {
    if (token) {
      try {
        const decodedToken: CustomTokenPayload = jwtDecode(token)
        const userID = decodedToken.user_id
        const userRole = decodedToken.user_role
        console.log(userRole)

        // Dispatch action to save user_id in Redux state
        store.dispatch(setUserId(userID))
        store.dispatch(setUserRole(userRole))
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }

  // Pass the action to the next middleware
  return next(action)
}

export default userMiddleware
