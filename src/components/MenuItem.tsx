import { NavBarElem } from '@/components/Navbar.tsx'
import Dropdown from '@/components/Dropdown.tsx'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

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
          <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={isDropdownActive ? 'true' : 'false'}
            onClick={() => toggleDropdown()}
          >
            <NavLink
              to={item.url}
              className={({ isActive }) => {
                return isActive
                  ? 'underline flex text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                  : 'ext-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }}
            >
              {item.title}
            </NavLink>
          </button>
          <Dropdown submenus={item.submenu} isActive={isDropdownActive} />
        </>
      ) : (
        <NavLink to={item.url}>{item.title}</NavLink>
      )}
    </li>
  )
}

export default MenuItem
