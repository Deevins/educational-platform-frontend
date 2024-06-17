import { Middleware } from 'redux'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { logout, setUserId, setUserRole } from '@/utils/redux/store/authSlice.ts'
import { useDispatch } from 'react-redux'

interface CustomTokenPayload extends JwtPayload {
  user_id: string
  user_role: string
  exp: number
  iat: number
}

const token = localStorage.getItem('token')

const userMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === 'INITIALIZE_USER') {
    if (token) {
      try {
        const decodedToken: CustomTokenPayload = jwtDecode(token)
        const userID = decodedToken.user_id
        const userRole = decodedToken.user_role

        if (checkTokenExpiration(decodedToken)) {
          const dispatch = useDispatch()
          dispatch(logout())
          localStorage.removeItem('token')
          // Pass the action to the next middleware
          return next(action)
        }

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

function checkTokenExpiration(decodedToken: CustomTokenPayload): boolean {
  const currentTime = Math.floor(Date.now() / 1000) // Текущее время в секундах

  return decodedToken.exp < currentTime // Возвращаем true, если токен истек
}
