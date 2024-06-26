import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import AvatarMenu from '@/components/AvatarMenu.tsx'
import { FaRegBell } from 'react-icons/fa'

const InstructorHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isTeacherModeOpen, setIsTeacherModeOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const openTeacherMode = () => {
    setIsHovered(true)
    setIsTeacherModeOpen(true)
  }

  const closeTeacherMode = () => {
    setIsHovered(false)
    setIsTeacherModeOpen(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsTeacherModeOpen(false)
  }

  const handleSwitchToStudentMode = () => {
    // TODO: after redux fix and make logic to switch current user role
    console.log('successfully switched to student')
  }

  return (
    <header className='bg-gray-200 text-black p-4 flex justify-end items-center shadow-xl w-screen'>
      <div className='flex space-x-4 lg:mr-16 text-center'>
        <div
          className='relative pb-[2px] flex center items-center'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className='text-black rounded-lg pt-4 px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300 hover:cursor-pointer hover:text-purple-700'
            onMouseEnter={openTeacherMode}
          >
            <NavLink to={'/'}>Студент</NavLink>
          </button>

          <FaRegBell className={'cursor-pointer mt-2 mr-2'} />
          {isHovered && isTeacherModeOpen && (
            <div
              ref={dialogRef}
              className='absolute left-0 mt-8 w-full lg:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50'
              onMouseLeave={closeTeacherMode}
              style={{ top: 'calc(20% + 20px)', left: '-70%' }}
            >
              <div className='p-4'>
                <p>Переключитесь в режим студента, чтобы вернуться к изучению курсов</p>
                <NavLink to={'/'} onClick={handleSwitchToStudentMode}></NavLink>
              </div>
            </div>
          )}
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
