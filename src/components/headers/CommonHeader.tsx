import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar } from '@/components/Navbar.tsx'
import { Button } from '@/components/ui/button.tsx'
import AvatarMenu from '@/components/AvatarMenu.tsx'

const CommonHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <header className='bg-gray-300 text-black p-4 flex justify-between items-center'>
      <NavLink to={'/'} className='hidden lg:flex md:flex items-center sm:hidden'>
        <img
          src='https://flowbite.com/docs/images/logo.svg'
          alt='Логотип'
          className='h-8 mr-4'
        />
        <h1 className='text-lg font-bold'>ProdigyPath Education</h1>
      </NavLink>

      <div className='text-center flex justify-center space-x-4 '>
        <Navbar />
      </div>

      <div className='flex space-x-4 lg:mr-16'>
        {isAuthenticated ? (
          <AvatarMenu />
        ) : (
          <>
            <NavLink to={'/auth/login'}>
              <Button
                onClick={handleLogin}
                className='bg-gray-50 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300 hover:cursor-pointer'
              >
                Войти
              </Button>
            </NavLink>
            <NavLink to={'/auth/register'}>
              <Button
                onClick={handleLogout}
                className='bg-gray-50 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300'
              >
                Зарегистрироваться
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default CommonHeader
