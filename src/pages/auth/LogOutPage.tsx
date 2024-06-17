import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/utils/redux/store/authSlice.ts'
import { useEffect } from 'react'

const LogOutPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token')
      navigate('/')
    }
    localStorage.removeItem('token')
  }, [isAuthenticated, navigate])
  return (
    <div className='flex justify-center items-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Вы успешно вышли</h2>
        <p className='mb-8'>
          Желаете вернуться на{'  '}
          <NavLink to='/' className='text-blue-500 hover:underline'>
            главную?
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default LogOutPage
