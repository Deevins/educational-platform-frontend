import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CoursesCheckList: React.FC = () => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='w-full lg:w-3/4 p-4'>
        <CourseList />
      </div>
    </div>
  )
}

export default CoursesCheckList

const COURSE_STATUSES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
}

// В модели курса добавляем поле createdAt
interface ICourse {
  id: number
  image: string
  author: string
  authorId: string
  title: string
  description: string
  createdAt: Date // Добавленное поле
}

const COURSES: ICourse[] = [
  {
    id: 1,
    image: 'https://encore.dev/assets/resources/kubernetes_cover.png',
    author: 'Author Name',
    authorId: '1', // Добавим authorId

    title: 'Course Title',
    description: 'Short description of the course',
    createdAt: new Date('1995-12-17T03:24:00'),
  },
]

interface CourseCardProps extends ICourse {
  onPublish: (id: number) => void
  onReject: (id: number) => void
}

const truncateDescription = (description: string) => {
  const words = description.split(' ')
  return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  image,
  author,
  authorId,
  title,
  description,
  createdAt,
  onPublish,
  onReject,
}) => {
  return (
    <div className='w-11/12 lg:w-3/4 rounded overflow-hidden shadow-lg m-4 flex flex-col lg:flex-row'>
      <div className='w-full lg:w-1/4'>
        <img className='w-full h-32 lg:h-full object-cover' src={image} alt={title} />
      </div>
      <div className='w-full lg:w-3/4 px-4 py-2 flex flex-col justify-between'>
        <div>
          <div className='font-bold text-lg mb-1'>{title}</div>
          <p className='text-gray-700 text-sm'>{truncateDescription(description)}</p>
          <p className='text-gray-600 text-xs'>
            By{' '}
            <Link
              to={`/users/user/${authorId}/profile`}
              className='text-blue-500 underline'
            >
              {author}
            </Link>
          </p>
          <p className='text-gray-600 text-xs'>Created on: {createdAt.toDateString()}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <button
            onClick={() => onPublish(id)}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs'
          >
            Publish
          </button>
          <button
            onClick={() => onReject(id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs'
          >
            Reject
          </button>
        </div>
        <div className='mt-2'>
          <Link
            to={`/courses/course/draft/${id}/learn`}
            className='text-blue-500 underline text-xs'
          >
            Go to course
          </Link>
        </div>
      </div>
    </div>
  )
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState(COURSES)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handlePublish = (id: number) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: COURSE_STATUSES.PUBLISHED } : course
      )
    )
  }

  const handleReject = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const sortedCourses = courses.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className='flex flex-col items-center'>
      {currentCourses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onPublish={handlePublish}
          onReject={handleReject}
        />
      ))}
      <div className='flex justify-center mt-4'>
        <ul className='flex list-none'>
          {Array.from(
            { length: Math.ceil(sortedCourses.length / itemsPerPage) },
            (_, index) => (
              <li key={index + 1} className='px-3 py-2 border rounded mx-1'>
                <button
                  onClick={() => paginate(index + 1)}
                  className={index + 1 === currentPage ? 'font-bold text-blue-500' : ''}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}
