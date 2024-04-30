import Dropdown, { DropdownElem } from '@/components/Dropdown.tsx'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { NavLink } from 'react-router-dom'

type NavBarElem = {
  title: string
  url: string
  submenu: DropdownElem[]
}

const menuItemsData: NavBarElem[] = [
  {
    title: 'Курсы',
    url: '/courses',
    submenu: [
      {
        title: 'Все курсы',
        url: '/courses',
      },
      {
        title: 'Мои курсы',
        url: '/courses/my',
      },
    ],
  },
  {
    title: 'Форум',
    url: '/forum',
    submenu: [
      {
        title: 'Все форумы',
        url: '/forum',
      },
      {
        title: 'Избранные треды',
        url: '/forum/favorites',
      },
    ],
  },
]

export const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev)
  }
  return (
    <>
      <nav className='desktop-nav flex flex-row'>
        <Button
          onClick={toggleSearch}
          className='bg-gray-300 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-100 z-30'
        >
          Поиск
        </Button>
        <ul className='menus'>
          {menuItemsData.map((menu, index) => {
            return <MenuItem item={menu} key={index} />
          })}
        </ul>
      </nav>
      {isSearchVisible && <SearchDialog />}
    </>
  )
}

type Props = {
  item: NavBarElem
}
const MenuItem = ({ item }: Props) => {
  const [isDropdownActive, setDropdown] = useState<boolean>(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        isDropdownActive &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [isDropdownActive])

  const onMouseEnter = () => {
    setDropdown(true)
  }

  const onMouseLeave = () => {
    setDropdown(false)
  }

  const toggleDropdown = () => {
    setDropdown((prev) => !prev)
  }

  return (
    <li
      className='menu-items'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.submenu ? (
        <>
          <Button
            type='button'
            aria-haspopup='menu'
            aria-expanded={isDropdownActive ? 'true' : 'false'}
            onClick={toggleDropdown}
          >
            <NavLink
              to={item.url}
              className={
                "ext-gray-900 hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'\n"
              }
            >
              {item.title}
            </NavLink>
          </Button>
          <Dropdown submenus={item.submenu} isActive={isDropdownActive} />
        </>
      ) : (
        <div className='hover:bg-red-300'>
          <NavLink to={item.url}>{item.title}</NavLink>
        </div>
      )}
    </li>
  )
}

const SearchDialog = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20 ml-0'>
      <div className='bg-white p-8 rounded-lg'>
        <div className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='Поиск...'
            className='border border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-blue-500'
          />
          <button className='ml-4 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-600 hover:text-gray-900'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.5 15l2.5 2.5M18 9a9 9 0 1 1-9 9'
              />
            </svg>
          </button>
        </div>
        <div className='border-b border-gray-300' />
        <div className='flex justify-between mt-4'>
          <button className='text-gray-500 hover:text-gray-900 focus:outline-none'>
            Курсы
          </button>
          <button className='text-gray-500 hover:text-gray-900 focus:outline-none'>
            Профили
          </button>
          <button className='text-gray-500 hover:text-gray-900 focus:outline-none'>
            Треды
          </button>
        </div>
      </div>
    </div>
  )
}
