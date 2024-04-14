import MenuItem from '@/components/MenuItem.tsx'

export type DropdownElem = {
  title: string
  url: string
}

export type NavBarElem = {
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
    ],
  },
  {
    title: 'Форум',
    url: '/forum',
    submenu: [],
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
        title: 'sub 3-3',
        url: '/profiles/subb3',
      },
    ],
  },
]

const Navbar = () => {
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

export default Navbar
