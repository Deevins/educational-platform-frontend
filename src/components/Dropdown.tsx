import { NavLink } from 'react-router-dom'

export type DropdownElem = {
  title: string
  url: string
}

type Props = {
  submenus: DropdownElem[]
  isActive: boolean
}
const Dropdown = ({ submenus, isActive }: Props) => {
  if (submenus.length < 1) {
    return
  }
  return (
    <ul className={`dropdown ${isActive ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className='menu-items'>
          <NavLink to={submenu.url}>{submenu.title}</NavLink>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
