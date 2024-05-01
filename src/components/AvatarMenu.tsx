import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import axios from 'axios'
import Popup from '@/components/Popup.tsx'
import { IUser } from '@/pages/UserProfilePage.tsx'
import { Button } from '@radix-ui/themes'
import { NavLink } from 'react-router-dom'

interface MenuItem {
  label: string
  to: string
  onClick?: () => void
}

type themeState = 'dark' | 'light'

const AvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [theme, setTheme] = React.useState<themeState>('light')
  const menuRef = React.useRef<HTMLDivElement>(null)

  const user: IUser = {
    id: 1,
    username: 'friend1',
    fullName: 'Friend One',
    email: 'friend1@example.com',
    avatar: 'https://github.com/shadcn.png',
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      // TODO: after backend registration fix
      await axios.post('/api/logout').then((r) => console.log(`xyi ${r.status}`))

      localStorage.removeItem('accessToken')
    } catch (error) {
      console.error('Ошибка при попытке выйти из аккаунта:', error)
      setError(
        'Произошла ошибка при разлогинивании. Пожалуйста, попробуйте еще раз. Проверьте ошибку в консоли'
      )
    } finally {
      setLoading(false)
      if (error !== null && error !== '') {
        window.location.href = '/auth/logout'
      }
    }
  }
  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems: MenuItem[] = [
    { label: 'Моя страница', to: `/profiles/${user.id}` },
    { label: 'Курсы', to: '/courses' },
    { label: 'Избранное', to: '/favorites' },
    { label: 'Настройки', to: '/settings' },
    { label: 'Выйти', to: '/auth/logout', onClick: handleLogout },
    {
      label: `Тема сайта ${theme === 'light' ? 'Светлая' : 'Темная'}`,
      onClick: handleThemeSwitch,
      to: '',
    },
  ]

  return (
    <div className='relative' ref={menuRef}>
      <div className='flex items-center'>
        <Button
          className='p-1 text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar className={'hover:scale-105'}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </div>
      {isOpen && (
        <div
          className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu'
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
                <Button
                  key={index}
                  onClick={item.onClick}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 active:bg-gray-200 active:text-gray-900 transform active:scale-95 w-full text-left'
                  role='menuitem'
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                </Button>
              )
            )}
          </div>
        </div>
      )}
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      )}
      {error && <Popup type={'error'} text={error} isPopupTriggered={error !== ''} />}
    </div>
  )
}

export default AvatarMenu
