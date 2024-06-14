import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  author_full_name: string
  rating: number
  reviews_count: number
  lectures_length: number
  lectures_count: number
  level: string
  course_avatar_url: string
}

const CoursesPage: React.FC = () => {
  const [filters, setFilters] = useState<{
    rating: number
    duration: number[]
    level: string
  }>({
    rating: 0,
    duration: [],
    level: 'all',
  })

  const handleFilterChange = (newFilters: {
    rating: number
    duration: number[]
    level: string
  }) => {
    setFilters(newFilters)
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar onFilterChange={handleFilterChange} />
      <main className='w-3/4 flex flex-col'>
        <CourseList filters={filters} />
      </main>
    </div>
  )
}

export default CoursesPage

interface CourseItemProps {
  course: Course
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center sm:flex-row sm:items-start hover:bg-white hover:opacity-65 hover:cursor-pointer'>
      <Link className={'flex w-full'} to={`/courses/course/${course.id}`}>
        <img
          src={course.course_avatar_url}
          alt={course.title}
          className='w-20 h-20 sm:w-40 sm:h-40 rounded-md'
        />
        <div className='mt-4 sm:mt-0 sm:ml-4'>
          <h2 className='text-lg font-bold'>{course.title}</h2>
          <p className='text-sm'>{course.subtitle}</p>
          <div className='mt-2 text-yellow-500'>{`Рейтинг: ${course.rating} (${course.reviews_count} отзывов)`}</div>
          <div className='mt-1'>{`Преподаватель: ${course.author_full_name}`}</div>
          <div className='mt-1'>{`Минут лекций: ${course.lectures_length}, Количество лекций: ${course.lectures_count}`}</div>
          <div className='mt-1'>{`Уровень начальной подготовки: ${course.level}`}</div>
        </div>
      </Link>
    </div>
  )
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface CourseListProps {
  filters: { rating: number; duration: number[]; level: string }
}

const CourseList: React.FC<CourseListProps> = ({ filters }) => {
  const { rating, duration, level } = filters
  const query = new URLSearchParams({
    rating: rating.toString(),
    duration: duration.join(','),
    level,
  }).toString()
  const { data, error } = useSWR<Course[]>(
    `http://localhost:8080/courses/get-all?${query}`,
    fetcher
  )

  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = data.slice(indexOfFirstCourse, indexOfLastCourse)

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / coursesPerPage)) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow space-y-4 p-4 overflow-y-auto'>
        {currentCourses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
      <div className='flex justify-between p-4 bg-white shadow-md'>
        <button
          onClick={handlePreviousPage}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${currentPage === 1 ? 'bg-black opacity-95' : ''} rounded-l hover:${currentPage === 1 ? 'cursor-not-allowed' : ''}  `}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='px-4 py-2'>{`Page ${currentPage} of ${Math.ceil(data.length / coursesPerPage)}`}</span>
        <button
          onClick={handleNextPage}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r hover:${currentPage === Math.ceil(data.length / coursesPerPage) ? 'cursor-not-allowed' : ''}`}
          disabled={currentPage === Math.ceil(data.length / coursesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

interface SidebarProps {
  onFilterChange: (filters: { rating: number; duration: number[]; level: string }) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [rating, setRating] = useState(0)
  const [duration, setDuration] = useState<number[]>([])
  const [level, setLevel] = useState('all')

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setRating(value)
    onFilterChange({ rating: value, duration, level })
  }

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    const newDuration = duration.includes(value)
      ? duration.filter((d) => d !== value)
      : [...duration, value]
    setDuration(newDuration)
    onFilterChange({ rating, duration: newDuration, level })
  }

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLevel(value)
    onFilterChange({ rating, duration, level: value })
  }

  return (
    <aside className='w-1/4 bg-white p-6 shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Фильтры</h2>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-700'>Рейтинг</h3>
        <ul className='space-y-2'>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='rating'
                value='4.5'
                onChange={handleRatingChange}
              />{' '}
              <span className='ml-2'>4.5 и выше</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='rating'
                value='4.0'
                onChange={handleRatingChange}
              />{' '}
              <span className='ml-2'>4.0 и выше</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='rating'
                value='3.5'
                onChange={handleRatingChange}
              />{' '}
              <span className='ml-2'>3.5 и выше</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='rating'
                value='3.0'
                onChange={handleRatingChange}
              />{' '}
              <span className='ml-2'>3.0 и выше</span>
            </label>
          </li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-700'>Длительность видео</h3>
        <ul className='space-y-2'>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox'
                value='1'
                onChange={handleDurationChange}
              />{' '}
              <span className='ml-2'>0-1 ч</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox'
                value='3'
                onChange={handleDurationChange}
              />
              <span className='ml-2'>1-3 ч</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox'
                value='6'
                onChange={handleDurationChange}
              />
              <span className='ml-2'>3-6 ч</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox'
                value='17'
                onChange={handleDurationChange}
              />
              <span className='ml-2'>6-17 ч</span>
            </label>
          </li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-700'>Уровень курса</h3>
        <ul className='space-y-2'>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='level'
                value='beginner'
                onChange={handleLevelChange}
              />
              <span className='ml-2'>Новичок</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='level'
                value='advanced'
                onChange={handleLevelChange}
              />
              <span className='ml-2'>Продвинутый</span>
            </label>
          </li>
          <li>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='level'
                value='all'
                onChange={handleLevelChange}
              />
              <span className='ml-2'>Все уровни</span>
            </label>
          </li>
        </ul>
      </div>
    </aside>
  )
}
