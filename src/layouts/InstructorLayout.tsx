import React, { useEffect, useRef, useState } from 'react'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import InstructorHeader from '@/components/headers/InstructorHeader.tsx'
import { FiBook, FiCalendar, FiHome, FiSettings, FiUsers } from 'react-icons/fi'

type PropsType = {
  children: React.ReactNode
}

const InstructorLayout: React.FC<PropsType> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number>(1)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleItemClick = (itemId: number) => {
    setActiveItem(itemId)
  }

  const handleMouseEnter = () => {
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    setIsMenuOpen(false)
  }
  return (
    <>
      <InstructorHeader />
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-20 md:w-30 bg-gray-800 text-white z-50 ${isMenuOpen ? 'md:w-96' : 'md:w-30'} transition-all duration-700`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Menu Button */}
        <div className='md:hidden p-4'>
          <button onClick={toggleMenu} className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              )}
            </svg>
            <span className={`ml-2 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <FiHome />
            </span>
          </button>
        </div>

        {/* Sidebar Content */}
        <div
          className={`flex flex-col justify-center ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          {/* Menu items */}
          <div className='py-4'>
            <MenuNavItem
              title='Курсы'
              icon={<FiHome size={20} />}
              isActive={activeItem === 1}
              onItemClick={() => handleItemClick(1)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Взаимодействие'
              icon={<FiSettings size={20} />}
              isActive={activeItem === 2}
              onItemClick={() => handleItemClick(2)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Успеваемость'
              icon={<FiBook size={20} />}
              isActive={activeItem === 3}
              onItemClick={() => handleItemClick(3)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Инструменты'
              icon={<FiUsers size={20} />}
              isActive={activeItem === 4}
              onItemClick={() => handleItemClick(4)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Ресурсы'
              icon={<FiCalendar size={20} />}
              isActive={activeItem === 5}
              onItemClick={() => handleItemClick(5)}
              isVisible={isMenuOpen}
            />
          </div>
        </div>
      </div>
      <div>{children}</div>
      <CommonFooter />
    </>
  )
}

interface MenuNavItemProps {
  title: string
  icon: React.ReactNode
  isActive: boolean
  onItemClick: () => void
  isVisible: boolean
}

const MenuNavItem: React.FC<MenuNavItemProps> = ({
  title,
  icon,
  isActive,
  onItemClick,
  isVisible,
}) => {
  return (
    <div
      className={`flex items-center px-4 py-2 cursor-pointer relative ${isActive ? 'bg-gray-700' : ''} ${
        isVisible ? 'transition-opacity duration-1000 opacity-100' : ''
      } hover:bg-gray-700 `}
      onClick={onItemClick}
    >
      <div
        className={`absolute left-0 w-2 h-full bg-blue-500 ${isActive ? '' : 'hidden'}`}
      ></div>
      <p
        className={`flex items-center px-4 py-2 cursor-pointer relative ${isActive ? 'bg-gray-700' : ''} ${
          isVisible ? 'transition-opacity duration-1000 opacity-100' : ''
        } hover:bg-gray-700 `}
      >
        {icon}
      </p>

      <span className='ml-2 text-lg block'>{title}</span>
    </div>
  )
}

export default InstructorLayout
