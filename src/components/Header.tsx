import { DropdownElem } from '@/components/Dropdown.tsx'
import AvatarWithDropdown from '@/components/AvatarWithDropdown.tsx'
import { Navbar } from '@/components/Navbar.tsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { NavLink } from 'react-router-dom'

const menuItemsData: DropdownElem[] = [
  { title: 'one', url: 'dasdsa' },
  { title: 'one', url: 'dasdsa' },
  { title: 'one', url: '222222' },
]

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <header className='bg-gray-100 text-black p-4 flex justify-between items-center'>
      <NavLink to={'/'} className='flex items-center'>
        <img
          src='https://flowbite.com/docs/images/logo.svg'
          alt='Логотип'
          className='h-8 mr-4'
        />

        <h1 className='text-lg font-bold'>Study-work</h1>
      </NavLink>

      <div className='text-center flex justify-center space-x-4'>
        <Navbar />
      </div>

      <div className='flex space-x-4'>
        {isAuthenticated ? (
          <AvatarWithDropdown submenus={menuItemsData} />
        ) : (
          <>
            <Button
              onClick={handleLogin}
              className=' bg-white text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300 hover:cursor-pointer'
            >
              Войти
            </Button>
            <Button
              onClick={handleLogout}
              className=' bg-white text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300'
            >
              Зарегистрироваться
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
