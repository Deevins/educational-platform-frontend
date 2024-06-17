import React, { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectRole, selectUserID } from '@/utils/redux/store/authSlice.ts'
import useSWR from 'swr'
import axios from 'axios'
import { IUser } from '@/pages/UserProfilePage.tsx'

interface MenuItem {
  label: string
  onClick?: () => void
  showCondition: boolean
}

const fetcher = (url: string) => axios.get<IUser>(url).then((res) => res.data)

const AvatarMenu: React.FC = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isNearMenu, setIsNearMenu] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  const userRole = useSelector(selectRole)
  const userID = useSelector(selectUserID)
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/users/get-one/${userID}`,
    fetcher
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth/logout')
  }

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
    {
      label: 'Моя страница',
      showCondition: true,
      onClick: () => {
        navigate(`/users/user/${userID}/profile`)
      },
    },
    {
      label: 'Курсы на проверку',
      showCondition: userRole === 'MODERATOR' || userRole === 'ADMIN',
      onClick: () => {
        navigate(`/courses/check/`)
      },
    },
    { label: 'Выйти', onClick: handleLogout, showCondition: true },
  ]

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
            <AvatarImage
              src={`${data?.avatar_url ? data?.avatar_url : 'https://github.com/shadcn.png'}`}
            />
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
            {menuItems.map(
              (item, index) =>
                item.showCondition && (
                  <Button
                    key={index}
                    onClick={item.onClick}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 active:bg-gray-200 active:text-gray-900 transform active:scale-95 w-full text-left'
                    role='menuitem'
                  >
                    {item.label}
                  </Button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarMenu
