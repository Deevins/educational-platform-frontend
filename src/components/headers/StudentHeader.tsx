import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import AvatarMenu from '@/components/AvatarMenu.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Navbar } from '@/components/Navbar.tsx'

const InstructorHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isInstructorModeOpen, setIsInstructorModeOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const openInstructorMode = () => {
    setIsHovered(true)
    setIsInstructorModeOpen(true)
  }

  const closeStudentMode = () => {
    setIsHovered(false)
    setIsInstructorModeOpen(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsInstructorModeOpen(false)
  }

  const handleSwitchToInstructorMode = () => {
    // TODO: after redux fix and make logic to switch current user role
    console.log('successfully switched to instructor')
  }

  return (
    <header className='bg-gray-200 text-black p-4 flex justify-between items-center shadow-xl'>
      <NavLink to={'/'} className='hidden lg:flex md:flex items-center sm:hidden'>
        <Avatar className={'hover:scale-105'}>
          <AvatarImage src={'https://flowbite.com/docs/images/logo.svg'} />
          <AvatarFallback>Логотип</AvatarFallback>
        </Avatar>
        <h1 className='text-lg font-bold'>ProdigyPath Education</h1>
      </NavLink>

      <div className='text-center flex justify-center space-x-4'>
        <Navbar />
      </div>

      <div className='flex space-x-4 lg:mr-16'>
        <div
          className='relative flex text-center'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className='text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-100 hover:cursor-pointer hover:text-purple-700 z-50'
            onMouseEnter={openInstructorMode}
          >
            <NavLink to={'/teaching'} onClick={handleSwitchToInstructorMode}>
              Преподаватель
            </NavLink>
          </button>
          <div ref={dialogRef}>
            {isHovered && isInstructorModeOpen && (
              <div
                className='absolute left-0 mt-8 w-full lg:w-64 bg-white border border-gray-300 rounded-lg shadow-lg'
                onMouseLeave={closeStudentMode}
                style={{ top: 'calc(20% + 8px)', left: '-30px' }}
              >
                <div className='p-4 flex text-center flex-col'>
                  <p className='text-mb font-bold mb-2 '>
                    Переключитесь в режим преподавателя
                  </p>
                  <p>Превратите свои знания в возможность и учите людей по всему миру.</p>
                  <NavLink
                    to={'/teaching'}
                    onClick={handleSwitchToInstructorMode}
                    className='block bg-black text-white rounded-lg px-4 py-2 mt-4 ml-2hover:bg-gray-800 mr-1'
                  >
                    Узнать подробнее
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
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
export default InstructorHeader
