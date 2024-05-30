import React, { useEffect, useRef, useState } from 'react'
import Dropdown, { DropdownElem } from '@/components/Dropdown.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link, NavLink } from 'react-router-dom'

type NavBarElem = {
  title: string
  url: string
  submenu: DropdownElem[]
}

const menuItemsData: NavBarElem[] = [
  {
    title: 'Курсы',
    url: '/courses/all',
    submenu: [
      // {
      //   title: 'Все курсы',
      //   url: '/courses/all',
      // },
      // {
      //   title: 'Мои курсы',
      //   url: '/courses/my',
      // },
    ],
  },
  {
    title: 'Форум',
    url: '/forum',
    submenu: [],
  },
]

export const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false)

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev)
    if (!isSearchVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleSearch()
    }
  }
  return (
    <>
      <nav className='desktop-nav flex flex-row'>
        <Button
          onClick={toggleSearch}
          className='bg-gray-200 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-100'
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
        <div
          className='fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-10'
          onClick={handleBackdropClick}
        >
          <SearchDialog onClickFunc={toggleSearch} />
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
      className={`menu-items z-50 ${item.submenu ? 'relative' : ''}`}
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
              className={`ext-gray-900 hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${
                item.submenu ? 'block' : ''
              }`}
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

type Course = {
  id: number
  type: 'course'
  title: string
  image: string
  rating: number
  enrollment: number
}

type Thread = {
  id: number
  type: 'thread'
  title: string
  createdDate: string
  lastResponseDate: string
  replyCount: number
  lastResponder: string
}

type SearchResult = Course | Thread

type SearchPossibility = 'courses' | 'threads'

interface SearchDialogProps {
  onClickFunc: () => void
}

const mockData: Record<SearchPossibility, SearchResult[]> = {
  courses: [
    {
      id: 1,
      type: 'course',
      title: 'Обучение Python',
      image: 'https://flowbite.com/docs/images/logo.svg',
      rating: 4.0,
      enrollment: 100,
    },
    {
      id: 2,
      type: 'course',
      title: 'Разработка на React + Redux',
      image: 'https://flowbite.com/docs/images/logo.svg',
      rating: 4.8,
      enrollment: 600,
    },
    {
      id: 3,
      type: 'course',
      title: 'Разработка микросервисов на Go',
      image: 'https://flowbite.com/docs/images/logo.svg',
      rating: 4.2,
      enrollment: 150,
    },
  ],
  threads: [
    {
      id: 1,
      type: 'thread',
      title: 'Тред 1',
      createdDate: '2024-05-10',
      lastResponseDate: '2024-05-15',
      replyCount: 10,
      lastResponder: 'someone 1',
    },
    {
      id: 2,
      type: 'thread',
      title: 'Тред 2',
      createdDate: '2024-05-11',
      lastResponseDate: '2024-05-16',
      replyCount: 8,
      lastResponder: 'someone 2',
    },
    {
      id: 3,
      type: 'thread',
      title: 'Тред 3',
      createdDate: '2024-05-12',
      lastResponseDate: '2024-05-17',
      replyCount: 15,
      lastResponder: 'someone 3',
    },
    {
      id: 4,
      type: 'thread',
      title: 'Тред 4',
      createdDate: '2024-05-10',
      lastResponseDate: '2024-05-15',
      replyCount: 10,
      lastResponder: 'someone 1',
    },
    {
      id: 5,
      type: 'thread',
      title: 'Тред 5',
      createdDate: '2024-05-11',
      lastResponseDate: '2024-05-16',
      replyCount: 8,
      lastResponder: 'someone 2',
    },
    {
      id: 6,
      type: 'thread',
      title: 'Тред 6',
      createdDate: '2024-05-12',
      lastResponseDate: '2024-05-17',
      replyCount: 15,
      lastResponder: 'someone 3',
    },
  ],
}

const SearchDialog: React.FC<SearchDialogProps> = ({ onClickFunc }) => {
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
            className='border border-gray-300 px-4 py-2 w-full rounded-full focus:outline-none focus:border-blue-500'
            value={searchText}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='border-b border-gray-300' />
        <div className='flex justify-center mt-4'>
          {['courses', 'threads'].map((option, index) => (
            <button
              key={index}
              className={`text-gray-500 hover:text-gray-900 focus:outline-none hover:scale-105 mr-6 ${
                searchOption === option
                  ? 'font-bold bg-gray-100 px-4 py-2 rounded-lg'
                  : ''
              }`}
              onClick={() => handleSearchOptionChange(option as SearchPossibility)}
            >
              {option === 'courses' && 'Курсы'}
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
                  onClick={() => {
                    onClickFunc()
                  }}
                  className='search-result-card border border-gray-300 rounded-lg overflow-hidden mt-4 cursor-pointer hover:bg-gray-100'
                >
                  {result.type === 'course' && (
                    <Link to={`/courses/course/${(result as Course).id}`}>
                      <CourseCard course={result as Course} />
                    </Link>
                  )}
                  {result.type === 'thread' && (
                    <Link to={`/forum/threads/thread/${(result as Thread).id}`}>
                      <ThreadCard thread={result as Thread} />
                    </Link>
                  )}
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

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className='flex p-4'>
      <img src={course.image} alt={course.title} className='w-16 h-16 mr-4' />
      <div>
        <h3 className='text-lg font-semibold'>{course.title}</h3>
        <div className='flex items-center'>
          <span className='mr-2'>Средний рейтинг: {course.rating}</span>
          <span>Количество участников: {course.enrollment}</span>
        </div>
      </div>
    </div>
  )
}

const ThreadCard: React.FC<{ thread: Thread }> = ({ thread }) => {
  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-lg font-semibold left-auto'>{thread.title}</h3>
          <p className='text-sm text-gray-500'>
            Создан {thread.createdDate} | Последний ответ - {thread.lastResponseDate}{' '}
            {thread.lastResponder}
          </p>
        </div>
        <div className='text-sm text-gray-500'>Ответов: {thread.replyCount}</div>
      </div>
    </div>
  )
}

export default SearchDialog
