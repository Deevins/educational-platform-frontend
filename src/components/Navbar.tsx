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
        url: '/courses/all',
      },
      {
        title: 'Мои курсы',
        url: '/courses/my',
      },
      {
        title: 'Курсы по теме',
        url: '/courses/by-theme',
      },
      {
        title: 'Поиск курсов',
        url: '/courses/search',
      },
    ],
  },
  {
    title: 'Профили',
    url: '/profiles',
    submenu: [
      {
        title: 'Все профили',
        url: '/profiles/all',
      },
      {
        title: 'Поиск профилей',
        url: '/profiles/search',
      },
    ],
  },
  {
    title: 'Форум',
    url: '/forum',
    submenu: [
      {
        title: 'Все форумы',
        url: '/profiles/all',
      },
      {
        title: 'Избранное',
        url: '/profiles/all',
      },
    ],
  },
]

export const Navbar = () => {
  return (
    <nav className='desktop-nav'>
      <ul className='menus'>
        {menuItemsData.map((menu, index) => {
          return <MenuItem item={menu} key={index} />
        })}
      </ul>
    </nav>
  )
}

type Props = {
  item: NavBarElem
}
const MenuItem = ({ item }: Props) => {
  const [isDropdownActive, setDropdown] = useState<boolean>(false)
  const ref = useRef<HTMLLIElement>()

  useEffect(() => {
    const handler = (event) => {
      if (isDropdownActive && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
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
      // @ts-ignore
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
            onClick={() => toggleDropdown()}
          >
            <NavLink
              to={item.url}
              className={({ isActive }) => {
                return isActive
                  ? 'underline flex text-gray-900 hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                  : 'ext-gray-900 hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }}
            >
              {item.title}
            </NavLink>
          </Button>
          <Dropdown submenus={item.submenu} isActive={isDropdownActive} />
        </>
      ) : (
        <NavLink to={item.url}>{item.title}</NavLink>
      )}
    </li>
  )
}
