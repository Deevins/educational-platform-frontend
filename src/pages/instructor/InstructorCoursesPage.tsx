import React, { useEffect, useRef, useState } from 'react'
import { FiBook, FiCalendar, FiHome, FiSettings, FiUsers } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const InstructorCoursesPage: React.FC = () => {
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
    <div className='relative flex h-screen'>
      {/* Sidebar */}
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
              title='Home'
              icon={<FiHome size={20} />}
              isActive={activeItem === 1}
              onItemClick={() => handleItemClick(1)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Settings'
              icon={<FiSettings size={20} />}
              isActive={activeItem === 2}
              onItemClick={() => handleItemClick(2)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Courses'
              icon={<FiBook size={20} />}
              isActive={activeItem === 3}
              onItemClick={() => handleItemClick(3)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Users'
              icon={<FiUsers size={20} />}
              isActive={activeItem === 4}
              onItemClick={() => handleItemClick(4)}
              isVisible={isMenuOpen}
            />
            <MenuNavItem
              title='Calendar'
              icon={<FiCalendar size={20} />}
              isActive={activeItem === 5}
              onItemClick={() => handleItemClick(5)}
              isVisible={isMenuOpen}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center pl-20 md:pl-30'>
        <div className='shadow-xl border-2 border-gray-100 lg:w-8/12 h-32 flex justify-between items-center mt-20 px-10'>
          <h1 className='text-xl pr-16 lg:pr-32 py-32'>Перейти к созданию курса</h1>
          <button className='hover:bg-blue-600 text-white font-bold lg:px-20 py-4 px-10 bg-black'>
            <NavLink to='/create-course'>Создать курс</NavLink>
          </button>
        </div>

        <div className='my-10'>
          <p className='text-center'>
            Исходя из вашего опыта, предлагаем вам ознакомиться со следующими ресурсами.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className={'flex justify-center'}>
            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 w-1/3 relative'>
              <div className='flex flex-col lg:flex-row'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 flex-grow'>
                  <h1 className='text-center mb-4 font-medium'>
                    Создайте привлекательный курс
                  </h1>
                  <p>
                    Вне зависимости от вашего опыта в преподавании вы можете сделать свой
                    курс увлекательным. Мы подготовили подборку ресурсов и передовых
                    методик, которые помогут вам достичь новых высот и выйти на новый
                    уровень.
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <NavLink to={''}>
                  <button className=' font-bold py-2 px-4 text-black hover:underline'>
                    Кнопка 1
                  </button>
                </NavLink>
              </div>
            </div>

            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 w-1/3 relative'>
              <div className='flex flex-col lg:flex-row'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 flex-grow'>
                  <h1 className='text-center mb-4 font-medium'>
                    Создайте привлекательный курс
                  </h1>
                  <p>
                    Вне зависимости от вашего опыта в преподавании вы можете сделать свой
                    курс увлекательным. Мы подготовили подборку ресурсов и передовых
                    методик, которые помогут вам достичь новых высот и выйти на новый
                    уровень.
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <NavLink to={''}>
                  <button className=' font-bold py-2 px-4 text-black hover:underline'>
                    Кнопка 1
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/*<div className='bg-gray-200 p-4 my-4'>*/}
          {/*  <p>Текст блока 2</p>*/}
          {/*  <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>*/}
          {/*    Кнопка 2*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div className='bg-gray-200 p-4 my-4'>*/}
          {/*  <p>Текст блока 3</p>*/}
          {/*  <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>*/}
          {/*    Кнопка 3*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
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
export default InstructorCoursesPage
