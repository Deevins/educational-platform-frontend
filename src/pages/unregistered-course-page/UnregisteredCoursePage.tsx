import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { GoVideo } from 'react-icons/go'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { LearnComponent } from '@/pages/unregistered-course-page/LearnComponent.tsx'
import { MaterialsComponent } from '@/pages/unregistered-course-page/MaterialsComponent.tsx'
import { InstructorComponent } from '@/pages/unregistered-course-page/InstructorComponent.tsx'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUserID } from '@/utils/redux/store/authSlice.ts'
import useSWR from 'swr'
import { Review, ReviewList } from '@/components/ReviewList.tsx'

interface Instructor {
  id: number
  full_name: string
  avatar_url: string
  description: string
  students_count: number
  courses_count: number
  ratings_count: number
  rating: number
  courses: InstructorCourseInfo[]
}

interface InstructorCourseInfo {
  id: number
  title: string
  avatar_url: string
  rating: number
  reviews_count: number
}

export interface CourseInfo {
  id: number
  title: string
  subtitle: string
  avatar_url: string
  category: string
  course_goals: string[]
  created_at: string
  description: string
  instructor: Instructor
  language: string
  lectures_count: number
  lectures_length: number
  level: string
  preview_video_URL: string
  rating: number
  requirements: string[]
  reviews_count: number
  status: string
  students_count: number
  target_audience: string[]
  reviews: Review[]
}

type ParamsType = {
  courseID: string
}

type IsStudentRegistered = {
  is_registered: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UnregisteredCoursePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('learn')
  const userID = useSelector(selectUserID)
  const { courseID } = useParams<ParamsType>()
  const [isStudentRegistered, setIsStudentRegistered] = useState<boolean>(false)
  const navigate = useNavigate()
  const { data, error } = useSWR<CourseInfo>(
    `http://localhost:8080/courses/get-full-course/${courseID}`,
    fetcher
  )
  useEffect(() => {
    axios
      .get<IsStudentRegistered>(
        `http://localhost:8080/users/check-if-user-registered-to-course`,
        {
          params: { userID, courseID },
        }
      )
      .then((response) => {
        setIsStudentRegistered(response.data.is_registered)
      })
  }, [courseID, userID])

  if (!data) {
    return <div>Loading...</div>
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'learn':
        return <LearnComponent courseInfo={data} />
      case 'materials':
        return <MaterialsComponent courseInfo={data} />
      case 'reviews':
        return <ReviewList reviews={data.reviews} />
      case 'instructor':
        return (
          <InstructorComponent
            id={data.instructor.id}
            name={data.instructor.full_name}
            rating={data.instructor.rating}
            reviewCount={data.instructor.ratings_count}
            studentCount={data.instructor.students_count}
            courseCount={data.instructor.courses_count}
            description={data.instructor.description}
            avatarURL={data.instructor.avatar_url}
          />
        )
      default:
        return <LearnComponent courseInfo={data} />
    }
  }

  const handleRegisterOnCourse = async () => {
    await axios.post(`http://localhost:8080/users/register-on-course`, {
      userID,
      courseID,
    })

    navigate(`/courses/course/${courseID}/learn/`)
  }

  if (error) return <div>Failed to load</div>

  return (
    <div className={'lg:w-full min-h-screen'}>
      <div className='bg-white p-5 flex lg:items-center flex-col '>
        <div className='flex mb-5'>
          {/*<div className='flex-col lg:flex lg:items-center w-full'> FIXME: adaptiv snizy*/}
          <div className='flex '>
            <ReactPlayer url={data.preview_video_URL} controls={true} />
            <div className={'ml-6'}>
              <h1 className='textdata-3xl font-bold text-gray-900 max-w-2xl truncate mb-4'>
                {data.title}
              </h1>
              <div className={'flex flex-col justify-center'}>
                <p className='text-xl text-gray-700 max-w-4xl truncate hover:text-clip mb-4'>
                  {data.subtitle}
                </p>
                <div className={'flex text-center items-center justify-center'}>
                  <RatingComponent
                    rating={data.rating}
                    totalRatings={data.reviews_count}
                  />
                  <div className='text-gray-600'>|</div>
                  <p className={'ml-auto'}> {data.students_count} студентов</p>
                </div>
                <p className={'flex items-center text-center'}>
                  <GoVideo className={'mr-2 mt-0.5'} />
                  {Math.floor(data.lectures_length / 60)}ч {data.lectures_count} мин
                  видеоматериала лекций
                </p>
                <p>
                  Автор:{' '}
                  <NavLink
                    to={`/users/user/${data.instructor.id}/profile`}
                    className={'hover:text-blue-500 text-purple-700'}
                  >
                    {data.instructor.full_name}
                  </NavLink>
                </p>
              </div>
              {isStudentRegistered ? (
                <Link to={`/courses/course/${courseID}/learn/`}>
                  <button
                    className={
                      'bg-black text-white py-2 w-full lg:mt-[23%] hover:bg-gray-800'
                    }
                  >
                    Перейти к курсу
                  </button>
                </Link>
              ) : (
                <button
                  className={
                    'bg-black text-white py-2 w-full lg:mt-[23%] hover:bg-gray-800'
                  }
                  onClick={handleRegisterOnCourse}
                >
                  Зарегистрироваться
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='ml-[17%] w-[68%] px-6 flex flex-col  mb-8 '>
        <div className={'flex border-b-2 mb-4'}>
          <button
            className={`px-4 py-2 ${activeSection === 'learn' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('learn')}
          >
            Чему вы научитесь
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'materials' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('materials')}
          >
            Материалы курса
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'reviews' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('reviews')}
          >
            Отзывы
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'instructor' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('instructor')}
          >
            Преподаватель
          </button>
        </div>
        {renderContent()}
        <InstructorCourses
          instructor_id={data.instructor.id}
          courses={data.instructor.courses}
        />
      </div>
    </div>
  )
}

export default UnregisteredCoursePage

interface CourseProps {
  course_id: number // Unique identifier for each course
  image: string
  title: string
  rating: number
  reviews: number
}

const CourseCard: React.FC<CourseProps> = ({
  course_id,
  image,
  title,
  rating,
  reviews,
}) => {
  return (
    <div className='no-underline flex justify-center w-full h-full '>
      <div className='bg-white p-4 w-5/12 rounded-lg shadow-md flex flex-col items-center hover:bg-gray-100 text-black transition duration-300 ease-in-out transform hover:scale-105'>
        <NavLink to={`/courses/course/${course_id}`}>
          <img src={image} alt={title} className='w-24 h-24 mb-2' />
          <div className='text-center flex flex-col justify-center'>
            <h3 className='text-sm font-bold'>{title}</h3>
            <p className='text-xs'>{`${rating} ⭐ (${reviews})`}</p>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

type InstructorCoursesProps = {
  instructor_id: number
  courses: InstructorCourseInfo[]
}

const InstructorCourses: React.FC<InstructorCoursesProps> = ({
  instructor_id,
  courses,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  if (courses === null || courses.length === 0) {
    return <div>No other courses yet</div>
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(courses.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <h1 className={'border-b-2 border-black pb-4 font-semibold mt-16'}>
        Другие курсы от{' '}
        <NavLink
          to={`/users/user/${instructor_id}/profile`}
          className={'hover:text-blue-500 text-purple-700'}
        >
          инструктора:
        </NavLink>
      </h1>
      <div className='bg-white p-6 shadow mt-4 grid grid-cols-3 gap-4 items-center'>
        {currentCourses.map((course) => (
          <CourseCard
            key={course.id + Math.random()}
            course_id={course.id}
            rating={course.rating}
            title={course.title}
            image={course.avatar_url}
            reviews={course.reviews_count}
          />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {pageNumbers.map((number) => (
          <button
            key={number + Math.random()}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

interface RatingComponentProps {
  rating: number // Rating value, e.g., 4.9
  totalRatings: number // Total number of ratings, e.g., 606
}

const RatingComponent: React.FC<RatingComponentProps> = ({ rating, totalRatings }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  const fullStarsIcons = Array(fullStars)
    .fill(null)
    .map((_, index) => <FaStar className='text-yellow-500' key={`full-${index}`} />)
  const halfStarIcon = halfStar ? (
    <FaStarHalfAlt className='text-yellow-500' key='half' />
  ) : null
  const emptyStarsIcons = Array(emptyStars)
    .fill(null)
    .map((_, index) => <FaRegStar className='text-yellow-500' key={`empty-${index}`} />)

  return (
    <div className='flex items-center text-lg'>
      <span className='font-semibold text-gray-900 mr-1'>{rating.toFixed(1)}</span>
      {fullStarsIcons}
      {halfStarIcon}
      {emptyStarsIcons}
      <span className='text-gray-600 ml-2'>({totalRatings.toLocaleString()} оценок)</span>
    </div>
  )
}
