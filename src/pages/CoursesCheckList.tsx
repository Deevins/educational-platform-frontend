import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Course } from '@/pages/CoursesPage.tsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import axios from 'axios'
import { ScrollToTop } from '@/utils/routes/scroll-to-top.ts'

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CoursesCheckList: React.FC = () => {
  const [changed, setChanged] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  // const { data, error, isLoading } = useSWR<Course[]>(
  //   `http://localhost:8080/courses/get-courses-waiting-for-approval`,
  //   fetcher
  // )

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get<Course[]>(
        `http://localhost:8080/courses/get-courses-waiting-for-approval`
      )
      console.log(response.data)

      setCourses(response.data)
      ScrollToTop()
    }

    getCourses()
  }, [changed])

  const handlePublish = async (id: number) => {
    await axios.post(`http://localhost:8080/courses/approve-course/${id}`)
    setChanged(!changed)
    console.log(`Published course ${id}`)
  }

  const handleReject = async (id: number) => {
    await axios.post(`http://localhost:8080/courses/reject-course/${id}`)
    setChanged(!changed)
    console.log(`rejected course ${id}`)
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className='w-full lg:w-3/4 p-4'>
        <CourseList courses={courses} onPublish={handlePublish} onReject={handleReject} />
      </div>
    </div>
  )
}

export default CoursesCheckList

interface CourseCardProps {
  id: number
  image: string
  author: string
  title: string
  createdAt: string
  description: string
  onPublish: (id: number) => void
  onReject: (id: number) => void
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  image,
  author,
  title,
  description,
  createdAt,
  onPublish,
  onReject,
}) => {
  return (
    <div className='border rounded-lg shadow-md p-4 w-full mb-4'>
      <div className='flex'>
        <img src={image} alt={title} className='w-32 h-32 object-cover rounded-l-lg' />
        <div className='ml-4 flex flex-col justify-between'>
          <div>
            <h2 className='text-lg font-bold'>{title}</h2>
            <p className='text-sm text-gray-600'>Создан: {author}</p>
            <p className='text-gray-700 mt-2'>{description}</p>
            <p className='text-gray-700 mt-2'>Дата создания курса: {createdAt}</p>
          </div>
          <div className='flex items-center mt-4'>
            <div>
              <Link
                to={`/courses/course/draft/${id}/learn`}
                className='text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 sm:mr-2 mr-0 mb-2 sm:mb-0'
              >
                <button>Открыть курс</button>
              </Link>
              <button
                onClick={() => onPublish(id)}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded sm:mr-2 mr-0 mt-2 sm:mt-0'
              >
                Опубликовать
              </button>
              <button
                onClick={() => onReject(id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-1 sm:mt-0'
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CourseListProps {
  courses: Course[]
  onPublish: (id: number) => void
  onReject: (id: number) => void
}

const CourseList: React.FC<CourseListProps> = ({ courses, onPublish, onReject }) => {
  const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('title')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-end mb-4 space-x-4 w-full'>
        <button
          onClick={() => setSortBy('title')}
          className={` text-white px-4 py-2 rounded ${sortBy === 'title' ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          Сортировать по названию
        </button>
        <button
          onClick={() => setSortBy('createdAt')}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${sortBy === 'createdAt' ? 'bg-blue-700' : ''}`}
        >
          Сортировать по дате
        </button>
      </div>
      <div className='w-full'>
        {paginatedCourses.length === 0 ? (
          <div>Нет курсов</div>
        ) : (
          paginatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              image={course.course_avatar_url}
              createdAt={format(new Date(course.created_date), 'dd MMMM yyyy ', {
                locale: ru,
              })}
              description={course.description}
              id={parseInt(course.id)}
              author={course.author_full_name}
              onPublish={onPublish}
              onReject={onReject}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={courses.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className='flex justify-center mt-4'>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
