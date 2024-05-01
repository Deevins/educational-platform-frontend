import Dropdown, { DropdownElem } from '@/components/Dropdown.tsx'
import React, { useEffect, useRef, useState } from 'react'
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
  const [isSearchVisible, setIsSearchVisible] = React.useState(false)

  const toggleSearch = () => {
    console.log(isSearchVisible)
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
      {isSearchVisible && (
        <div className={'z-50'}>
          <SearchDialog />
        </div>
      )}
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

type Person = {
  type: 'person'
  fullName: string
  avatar: string
  nickname: string
}

type Course = {
  type: 'course'
  title: string
  image: string
  rating: number
  enrollment: number
}

type Thread = {
  type: 'thread'
  title: string
  topic: string
}

type SearchResult = Person | Course | Thread

type SearchPossibility = 'courses' | 'profiles' | 'threads'

const mockData: Record<SearchPossibility, SearchResult[]> = {
  courses: [
    {
      type: 'course',
      title: 'Курс 1',
      image: '/course1.jpg',
      rating: 4.5,
      enrollment: 100,
    },
    {
      type: 'course',
      title: 'Курс 2',
      image: '/course2.jpg',
      rating: 4.8,
      enrollment: 120,
    },
    {
      type: 'course',
      title: 'Курс 3',
      image: '/course3.jpg',
      rating: 4.2,
      enrollment: 80,
    },
  ],
  profiles: [
    {
      type: 'person',
      fullName: 'Иван Иванов',
      avatar: '/avatar1.jpg',
      nickname: '@ivan',
    },
    {
      type: 'person',
      fullName: 'Петр Петров',
      avatar: '/avatar2.jpg',
      nickname: '@peter',
    },
    {
      type: 'person',
      fullName: 'Анна Сидорова',
      avatar: '/avatar3.jpg',
      nickname: '@anna',
    },
  ],
  threads: [
    { type: 'thread', title: 'Тред 1', topic: 'Тема треда 1' },
    { type: 'thread', title: 'Тред 2', topic: 'Тема треда 2' },
    { type: 'thread', title: 'Тред 3', topic: 'Тема треда 3' },
  ],
}

const SearchDialog = () => {
  const [searchOption, setSearchOption] = useState<SearchPossibility>('courses')
  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchOptionChange = (option: SearchPossibility) => {
    setSearchOption(option)
    setSearchText('')
    setSearchResults([])
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearchText(text)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const data = mockData[searchOption].filter((item) =>
        getItemName(item).toLowerCase().includes(text.toLowerCase())
      )
      setSearchResults(data)
    }, 1000)
  }

  const getItemName = (item: SearchResult): string => {
    switch (item.type) {
      case 'person':
        return (item as Person).fullName
      case 'course':
        return (item as Course).title
      case 'thread':
        return (item as Thread).title
      default:
        return ''
    }
  }

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='p-8'>
        <div className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='Поиск...'
            className='border border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-blue-500'
            value={searchText}
            onChange={handleSearchInputChange}
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
          {['courses', 'profiles', 'threads'].map((option, index) => (
            <button
              key={index}
              className={`text-gray-500 hover:text-gray-900 focus:outline-none ${
                searchOption === option ? 'font-bold' : ''
              }`}
              onClick={() => handleSearchOptionChange(option as SearchPossibility)}
            >
              {option === 'courses' && 'Курсы'}
              {option === 'profiles' && 'Профили'}
              {option === 'threads' && 'Треды'}
            </button>
          ))}
        </div>
        <div className='mt-4 space-y-4'>
          {searchResults.length > 0 ? (
            <div className='search-results'>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className='search-result-card border border-gray-300 rounded-lg overflow-hidden'
                >
                  {result.type === 'person' && <PersonCard person={result as Person} />}
                  {result.type === 'course' && <CourseCard course={result as Course} />}
                  {result.type === 'thread' && <ThreadCard thread={result as Thread} />}
                </div>
              ))}
            </div>
          ) : (
            <p>Нет результатов</p>
          )}
        </div>
      </div>
    </div>
  )
}

const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div className='flex p-4'>
      <img
        src={person.avatar}
        alt={person.fullName}
        className='w-16 h-16 mr-4 rounded-full'
      />
      <div>
        <h3 className='text-lg font-semibold'>{person.fullName}</h3>
        <p className='text-sm text-gray-500'>{person.nickname}</p>
      </div>
    </div>
  )
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className='flex p-4'>
      <img src={course.image} alt={course.title} className='w-16 h-16 mr-4' />
      <div>
        <h3 className='text-lg font-semibold'>{course.title}</h3>
        <div className='flex items-center'>
          <span className='mr-2'>{course.rating}</span>
          <span>{course.enrollment}</span>
        </div>
      </div>
    </div>
  )
}

const ThreadCard: React.FC<{ thread: Thread }> = ({ thread }) => {
  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold'>{thread.title}</h3>
      <p className='text-sm text-gray-500'>{thread.topic}</p>
    </div>
  )
}

export default SearchDialog
