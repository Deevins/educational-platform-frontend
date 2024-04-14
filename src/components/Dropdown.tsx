import { DropdownElem } from '@/components/Navbar.tsx'

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
          <a href={submenu.url}>{submenu.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
