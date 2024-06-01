import React, { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { IUser } from '@/pages/UserProfilePage.tsx'
import { Button } from '@radix-ui/themes'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/utils/redux/store/authSlice.ts'

interface MenuItem {
  label: string
  to: string
  onClick?: () => void
}

// type themeState = 'dark' | 'light'

const AvatarMenu: React.FC = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  // const [theme, setTheme] = React.useState<themeState>('light')
  const [isNearMenu, setIsNearMenu] = React.useState(false) // Состояние, отображающее, находится ли курсор рядом с меню
  const menuRef = React.useRef<HTMLDivElement>(null)
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null)
  const user: IUser = {
    id: 1,
    username: 'friend1',
    fullName: 'Виктор Самсонов',
    email: 'daker255@bk.ru',
    avatar: 'https://github.com/shadcn.png',
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  // const handleThemeSwitch = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light'
  //   setTheme(newTheme)
  // }

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current) // Clear timeout if mouse re-enters
      leaveTimeout.current = null
    }
    setIsOpen(true)
  }

  const handleMenuMouseEnter = () => {
    setIsNearMenu(true) // Установить состояние, когда курсор рядом с меню
  }

  const handleMouseLeave = () => {
    // Проверяем, находится ли курсор внутри меню или в его близости
    if (isNearMenu) {
      return // Если да, то не закрываем меню
    }
    leaveTimeout.current = setTimeout(() => {
      setIsOpen(false)
      leaveTimeout.current = null
    }, 600)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems: MenuItem[] = [
    { label: 'Моя страница', to: `/users/user/${user.id}/profile` },
    // {
    // label: `Тема сайта ${theme === 'light' ? 'Светлая' : 'Темная'}`,
    // onClick: handleThemeSwitch,
    // to: '',
    // },
    { label: 'Курсы на проверку', to: `/courses/check/` },
    { label: 'Выйти', to: '/auth/logout', onClick: handleLogout },
  ]

  return (
    <div className='relative' ref={menuRef}>
      <div className='flex items-center'>
        <Button
          className='p-1 text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar className={'hover:scale-[135%] scale-125 mr-16'}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </div>
      {isOpen && (
        <div
          className='absolute right-0 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu'
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='py-1'>
            {menuItems.map((item, index) =>
              item.to === '' ? (
                <Button
                  key={index}
                  onClick={item.onClick}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 active:bg-gray-200 active:text-gray-900 transform active:scale-95 w-full text-left'
                  role='menuitem'
                >
                  {item.label}
                </Button>
              ) : (
                <NavLink to={item.to}>
                  <Button
                    key={index}
                    onClick={item.onClick}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 active:bg-gray-200 active:text-gray-900 transform active:scale-95 w-full text-left'
                    role='menuitem'
                  >
                    {item.label}
                  </Button>
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarMenu
