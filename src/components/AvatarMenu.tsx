import React, { useState } from 'react'
import { Transition } from '@headlessui/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Popup from '@/components/Popup.tsx'
import { IUser } from '@/pages/UserProfilePage.tsx'

interface MenuItem {
  label: string
  to: string
  onClick?: () => void
}

const AvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const user: IUser = {
    id: 1,
    username: 'friend1',
    fullName: 'Friend One',
    email: 'friend1@example.com',
    avatar: 'https://github.com/shadcn.png',
  }

  const logout = async () => {
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

  const menuItems: MenuItem[] = [
    { label: 'Моя страница', to: `/profiles/${user.id}` },
    { label: 'Настройки', to: '/settings' },
    { label: 'Подписки', to: '/subscriptions' },
    { label: 'Избранное', to: '/favorites' },
    { label: 'Друзья', to: '/friends' },
    { label: 'Сообщения', to: '/messages' },
    { label: 'Выйти', to: '/auth/logout', onClick: logout },
  ]

  return (
    <div className='relative'>
      <div className='flex items-center'>
        <button
          className='p-1 text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar className={'hover:scale-105'}>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      </div>
      <Transition
        show={isOpen}
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        {() => (
          <div
            className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu'
          >
            <div className='py-1'>
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={item.onClick} // Привязываем функцию onClick к NavLink
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </Transition>
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
